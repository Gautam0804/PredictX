const Machine = require("../models/Machine");

const getDashboard = async (req, res, next) => {
  try {
    const machines = await Machine.find().lean();

    const totalMachines = machines.length;

    const healthyMachines = machines.filter(
      (machine) => machine.status === "HEALTHY"
    ).length;

    const atRiskMachines = machines.filter(
      (machine) => machine.status === "AT_RISK"
    ).length;

    const criticalMachines = machines.filter(
      (machine) => machine.status === "CRITICAL"
    ).length;

    const predictedFailures = machines.filter(
      (machine) => machine.failureProbability >= 0.5
    ).length;

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalMachines,
          healthyMachines,
          atRiskMachines,
          criticalMachines,
          predictedFailures
        },
        machines
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard
};