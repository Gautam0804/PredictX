const mongoose = require("mongoose");

const Machine = require("../models/Machine");
const SensorReading = require("../models/SensorReading");
const Prediction = require("../models/Prediction");

const {
  calculateHealthScore,
  getRiskLevel,
  getMachineStatus
} = require("./health.service");

const {
  predictSensorData
} = require("./machine.service");

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL ||
  "http://localhost:8000";

const detectAnomaly = async ({
  temperature,
  vibration,
  pressure,
  rpm,
  current
}) => {
  const response = await fetch(
    `${ML_SERVICE_URL}/anomaly`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        temperature,
        vibration,
        pressure,
        rpm,
        current
      })
    }
  );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `ML anomaly service returned ${response.status}: ${responseText}`
    );
  }

  return JSON.parse(responseText);
};

const createSensorReading = async ({
  machineId,
  temperature,
  vibration,
  pressure,
  rpm,
  current,
  recordedAt
}) => {
  /*
   * Verify machine exists before
   * calling external ML services.
   */
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      `Machine ${machineId} not found`
    );

    error.statusCode = 404;

    throw error;
  }

  /*
   * -------------------------------
   * 1. Calculate health
   * -------------------------------
   */
  const healthScore =
    calculateHealthScore({
      temperature,
      vibration,
      pressure,
      rpm,
      current
    });

  /*
   * -------------------------------
   * 2. Detect anomaly
   * -------------------------------
   */
  const anomaly =
    await detectAnomaly({
      temperature,
      vibration,
      pressure,
      rpm,
      current
    });

  const isAnomaly =
    Boolean(anomaly.is_anomaly);

  const anomalyScore =
    Number(anomaly.anomaly_score);

  /*
   * -------------------------------
   * 3. Predict failure
   * -------------------------------
   *
   * IMPORTANT:
   * Use the NEW sensor reading,
   * not machine.latestSensorData.
   */
  const prediction =
    await predictSensorData({
      temperature,
      vibration,
      pressure,
      rpm,
      current
    });

  const failureProbability =
    Number(
      prediction.failure_probability
    );

  const predictionRiskLevel =
    prediction.risk_level;

  /*
   * Risk for sensor reading:
   *
   * We keep the ML prediction as the
   * primary failure-risk signal.
   */
  const riskLevel =
    getRiskLevel({
      healthScore,
      isAnomaly
    });

  /*
   * If ML predicts a more serious
   * failure level, don't downgrade it.
   */
  const finalRiskLevel =
    getHighestRiskLevel(
      riskLevel,
      predictionRiskLevel
    );

  const machineStatus =
    getMachineStatus(
      finalRiskLevel
    );

  /*
   * -------------------------------
   * 4. MongoDB transaction
   * -------------------------------
   *
   * External ML work is already done.
   * Only database operations are inside
   * the transaction.
   */
  const session =
    await mongoose.startSession();

  try {
    let createdReading;
    let createdPrediction;

    await session.withTransaction(
      async () => {
        const currentMachine =
          await Machine.findOne({
            machineId
          }).session(session);

        if (!currentMachine) {
          const error = new Error(
            `Machine ${machineId} not found`
          );

          error.statusCode = 404;

          throw error;
        }

        /*
         * Save sensor reading.
         */
        const readings =
          await SensorReading.create(
            [
              {
                machineId:
                  currentMachine._id,

                temperature,
                vibration,
                pressure,
                rpm,
                current,

                healthScore,

                isAnomaly,

                anomalyScore,

                riskLevel:
                  finalRiskLevel,

                recordedAt:
                  recordedAt ||
                  new Date()
              }
            ],
            {
              session
            }
          );

        createdReading =
          readings[0];

        /*
         * Save AI prediction history.
         */
        const predictions =
          await Prediction.create(
            [
              {
                machineId:
                  currentMachine._id,

                failureProbability,

                riskLevel:
                  predictionRiskLevel,

                healthScore,

                recommendation:
                  prediction.recommendation,

                modelVersion:
                  "1.0.0",

                sensorSnapshot: {
                  temperature,
                  vibration,
                  pressure,
                  rpm,
                  current
                },

                predictedAt:
                  createdReading.recordedAt
              }
            ],
            {
              session
            }
          );

        createdPrediction =
          predictions[0];

        /*
         * Update machine's latest state.
         */
        await Machine.updateOne(
          {
            _id:
              currentMachine._id
          },
          {
            $set: {
              healthScore,

              status:
                machineStatus,

              failureProbability,

              "latestSensorData.temperature":
                temperature,

              "latestSensorData.vibration":
                vibration,

              "latestSensorData.pressure":
                pressure,

              "latestSensorData.rpm":
                rpm,

              "latestSensorData.current":
                current,

              "latestSensorData.recordedAt":
                createdReading.recordedAt
            }
          },
          {
            session
          }
        );
      }
    );

    return {
      reading: createdReading,
      prediction: createdPrediction
    };
  } finally {
    await session.endSession();
  }
};

const getSensorReadings = async (
  machineId,
  limit = 50
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      `Machine ${machineId} not found`
    );

    error.statusCode = 404;

    throw error;
  }

  return SensorReading.find({
    machineId:
      machine._id
  })
    .sort({
      recordedAt: -1
    })
    .limit(limit)
    .lean();
};

const getLatestSensorReading = async (
  machineId
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      `Machine ${machineId} not found`
    );

    error.statusCode = 404;

    throw error;
  }

  return SensorReading.findOne({
    machineId:
      machine._id
  })
    .sort({
      recordedAt: -1
    })
    .lean();
};


/*
 * Return the more severe risk level.
 */
const getHighestRiskLevel = (
  first,
  second
) => {
  const severity = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4
  };

  return severity[first] >=
    severity[second]
    ? first
    : second;
};


module.exports = {
  createSensorReading,
  getSensorReadings,
  getLatestSensorReading
};