const Machine = require("../models/Machine");
const {
  predictMachine
} = require("../services/machine.service");

const predictForMachine = async (req, res, next) => {
  try {
    const machine = await Machine.findOne({
      machineId: req.params.machineId
    }).lean();

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found"
      });
    }

    const prediction = await predictMachine(machine);

    await Machine.updateOne(
      { _id: machine._id },
      {
        $set: {
          failureProbability:
            prediction.failure_probability,
          healthScore:
            prediction.health_score,
          status:
            prediction.risk_level === "CRITICAL"
              ? "CRITICAL"
              : prediction.risk_level === "HIGH"
                ? "AT_RISK"
                : "HEALTHY"
        }
      }
    );

    res.status(200).json({
      success: true,
      data: {
        machineId: machine.machineId,
        machineName: machine.name,
        ...prediction
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  predictForMachine
};