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
      required: true,
      min: 0
    },

    vibration: {
      type: Number,
      required: true,
      min: 0
    },

    pressure: {
      type: Number,
      required: true,
      min: 0
    },

    rpm: {
      type: Number,
      required: true,
      min: 0
    },

    current: {
      type: Number,
      required: true,
      min: 0
    },

    // AI-generated information
    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },

    isAnomaly: {
      type: Boolean,
      default: false
    },

    anomalyScore: {
      type: Number,
      default: null
    },

    riskLevel: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
      ],
      default: "LOW"
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

sensorReadingSchema.index({
  machineId: 1,
  recordedAt: -1
});

module.exports = mongoose.model(
  "SensorReading",
  sensorReadingSchema
);