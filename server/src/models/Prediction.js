const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
      index: true
    },

    failureProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },

    riskLevel: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
      ],
      required: true
    },

    healthScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    recommendation: {
      type: String,
      required: true,
      trim: true
    },

    modelVersion: {
      type: String,
      default: "1.0.0"
    },

    sensorSnapshot: {
      temperature: Number,
      vibration: Number,
      pressure: Number,
      rpm: Number,
      current: Number
    },

    predictedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

predictionSchema.index({
  machineId: 1,
  predictedAt: -1
});

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);