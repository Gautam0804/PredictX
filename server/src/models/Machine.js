const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      default: "Production Floor"
    },

    status: {
      type: String,
      enum: [
        "HEALTHY",
        "AT_RISK",
        "CRITICAL",
        "OFFLINE"
      ],
      default: "HEALTHY"
    },

    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },

    failureProbability: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    },

    lastMaintenanceAt: {
      type: Date,
      default: null
    },

    // Latest sensor readings from the machine
    latestSensorData: {
      temperature: {
        type: Number,
        default: 70
      },

      vibration: {
        type: Number,
        default: 2
      },

      pressure: {
        type: Number,
        default: 100
      },

      rpm: {
        type: Number,
        default: 1500
      },

      current: {
        type: Number,
        default: 20
      },

      recordedAt: {
        type: Date,
        default: null
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Machine",
  machineSchema
);