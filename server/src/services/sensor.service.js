const mongoose = require("mongoose");

const Machine = require("../models/Machine");
const SensorReading = require("../models/SensorReading");

const createSensorReading = async ({
  machineId,
  temperature,
  vibration,
  pressure,
  rpm,
  current,
  recordedAt
}) => {
  const session = await mongoose.startSession();

  try {
    let createdReading;

    await session.withTransaction(async () => {
      const machine = await Machine.findOne({
        machineId
      }).session(session);

      if (!machine) {
        const error = new Error(
          `Machine ${machineId} not found`
        );

        error.statusCode = 404;

        throw error;
      }

      const readings = await SensorReading.create(
        [
          {
            machineId: machine._id,
            temperature,
            vibration,
            pressure,
            rpm,
            current,
            recordedAt: recordedAt || new Date()
          }
        ],
        { session }
      );

      createdReading = readings[0];

      await Machine.updateOne(
        { _id: machine._id },
        {
          $set: {
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
        { session }
      );
    });

    return createdReading;
  } finally {
    await session.endSession();
  }
};

const getSensorReadings = async (
  machineId,
  limit = 50
) => {
  const machine = await Machine.findOne({
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
    machineId: machine._id
  })
    .sort({ recordedAt: -1 })
    .limit(limit)
    .lean();
};

const getLatestSensorReading = async (
  machineId
) => {
  const machine = await Machine.findOne({
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
    machineId: machine._id
  })
    .sort({ recordedAt: -1 })
    .lean();
};

module.exports = {
  createSensorReading,
  getSensorReadings,
  getLatestSensorReading
};