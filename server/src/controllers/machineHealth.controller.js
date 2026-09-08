const Machine = require("../models/Machine");
const SensorReading = require("../models/SensorReading");

const getMachineHealth = async (
  req,
  res,
  next
) => {
  try {
    const machine =
      await Machine.findOne({
        machineId:
          req.params.machineId
      }).lean();

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found"
      });
    }

    const latestReading =
      await SensorReading.findOne({
        machineId:
          machine._id
      })
        .sort({
          recordedAt: -1
        })
        .lean();

    res.status(200).json({
      success: true,
      data: {
        machineId:
          machine.machineId,

        machineName:
          machine.name,

        status:
          machine.status,

        healthScore:
          machine.healthScore,

        failureProbability:
          machine.failureProbability,

        latestSensorData:
          machine.latestSensorData,

        latestAnalysis:
          latestReading
            ? {
                healthScore:
                  latestReading.healthScore,

                isAnomaly:
                  latestReading.isAnomaly,

                anomalyScore:
                  latestReading.anomalyScore,

                riskLevel:
                  latestReading.riskLevel,

                recordedAt:
                  latestReading.recordedAt
              }
            : null
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMachineHealth
};