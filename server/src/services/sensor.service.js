const mongoose = require("mongoose");

const Machine = require("../models/Machine");
const SensorReading = require("../models/SensorReading");

const {
  calculateHealthScore,
  getRiskLevel,
  getMachineStatus
} = require("./health.service");

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
   * Step 1:
   * Verify that the machine exists.
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
   * Step 2:
   * Calculate health before opening
   * the database transaction.
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
   * Step 3:
   * Ask the ML service for anomaly
   * detection.
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
   * Step 4:
   * Calculate machine risk.
   */
  const riskLevel =
    getRiskLevel({
      healthScore,
      isAnomaly
    });

  const machineStatus =
    getMachineStatus(
      riskLevel
    );

  /*
   * Step 5:
   * Now start the MongoDB transaction.
   */
  const session =
    await mongoose.startSession();

  try {
    let createdReading;

    await session.withTransaction(
      async () => {
        /*
         * Re-check the machine inside
         * the transaction to protect
         * against race conditions.
         */
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
         * Save sensor reading + AI results.
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

                riskLevel,

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

              failureProbability:
                currentMachine.failureProbability,

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

    return createdReading;
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

module.exports = {
  createSensorReading,
  getSensorReadings,
  getLatestSensorReading
};