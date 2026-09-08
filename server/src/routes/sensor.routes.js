const express = require("express");

const {
  createReading,
  getReadings,
  getLatestReading
} = require("../controllers/sensor.controller");

const router = express.Router();

router.post(
  "/readings",
  createReading
);

router.get(
  "/:machineId/latest",
  getLatestReading
);

router.get(
  "/:machineId",
  getReadings
);

module.exports = router;