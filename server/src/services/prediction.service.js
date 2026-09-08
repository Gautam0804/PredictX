const Machine = require("../models/Machine");
const Prediction = require("../models/Prediction");

const {
  predictMachine
} = require("./machine.service");

const createPrediction = async (
  machineId
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      "Machine not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const prediction =
    await predictMachine(machine);

  const sensor =
    machine.latestSensorData || {};

  const predictionRecord =
    await Prediction.create({
      machineId: machine._id,

      failureProbability:
        prediction.failure_probability,

      riskLevel:
        prediction.risk_level,

      healthScore:
        prediction.health_score,

      recommendation:
        prediction.recommendation,

      modelVersion: "1.0.0",

      sensorSnapshot: {
        temperature:
          sensor.temperature,

        vibration:
          sensor.vibration,

        pressure:
          sensor.pressure,

        rpm:
          sensor.rpm,

        current:
          sensor.current
      }
    });

  /*
   * Keep the machine document synchronized
   * with the latest AI prediction.
   */
  const status =
    prediction.risk_level === "CRITICAL"
      ? "CRITICAL"
      : prediction.risk_level === "HIGH"
        ? "AT_RISK"
        : "HEALTHY";

  await Machine.updateOne(
    {
      _id: machine._id
    },
    {
      $set: {
        failureProbability:
          prediction.failure_probability,

        healthScore:
          prediction.health_score,

        status
      }
    }
  );

  return {
    prediction,
    predictionRecord
  };
};

const getPredictionHistory = async (
  machineId,
  limit = 50
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      "Machine not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return Prediction.find({
    machineId: machine._id
  })
    .sort({
      predictedAt: -1
    })
    .limit(limit)
    .lean();
};

const getLatestPrediction = async (
  machineId
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      "Machine not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return Prediction.findOne({
    machineId: machine._id
  })
    .sort({
      predictedAt: -1
    })
    .lean();
};

module.exports = {
  createPrediction,
  getPredictionHistory,
  getLatestPrediction
};