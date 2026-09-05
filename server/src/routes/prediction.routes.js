const express = require("express");

const {
  predictForMachine
} = require("../controllers/prediction.controller");

const router = express.Router();

router.post(
  "/:machineId",
  predictForMachine
);

module.exports = router;