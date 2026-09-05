const Machine = require("../models/Machine");

const getMachines = async (req, res, next) => {
  try {
    const machines = await Machine.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: machines.length,
      data: machines
    });
  } catch (error) {
    next(error);
  }
};

const getMachineById = async (req, res, next) => {
  try {
    const machine = await Machine.findById(req.params.id).lean();

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found"
      });
    }

    res.status(200).json({
      success: true,
      data: machine
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMachines,
  getMachineById
};