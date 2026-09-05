const express = require("express");

const {
  getMachines,
  getMachineById
} = require("../controllers/machine.controller");

const router = express.Router();

router.get("/", getMachines);
router.get("/:id", getMachineById);

module.exports = router;