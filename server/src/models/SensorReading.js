const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
  {
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
      index: true
    },

    temperature: {
      type: Number,
      required: true
    },

    vibration: {
      type: Number,
      required: true
    },

    pressure: {
      type: Number,
      required: true
    },

    rpm: {
      type: Number,
      required: true
    },

    current: {
      type: Number,
      required: true
    },

    recordedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "SensorReading",
  sensorReadingSchema
);