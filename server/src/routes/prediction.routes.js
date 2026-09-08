const express = require("express");

const {
  predictForMachine,
  getPredictions,
  getLatest
} = require(
  "../controllers/prediction.controller"
);

const router = express.Router();

router.post(
  "/:machineId",
  predictForMachine
);

router.get(
  "/:machineId",
  getPredictions
);

router.get(
  "/:machineId/latest",
  getLatest
);

module.exports = router;