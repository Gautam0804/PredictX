const express = require("express");

const {
  getMachineHealth
} = require(
  "../controllers/machineHealth.controller"
);

const router = express.Router();

router.get(
  "/:machineId",
  getMachineHealth
);

module.exports = router;