const Machine = require("../models/Machine");

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || "http://localhost:8000";

const predictMachine = async (machine) => {
  const sensor = machine.latestSensorData || {};

  const payload = {
    temperature: Number(sensor.temperature ?? 70),
    vibration: Number(sensor.vibration ?? 2),
    pressure: Number(sensor.pressure ?? 100),
    rpm: Number(sensor.rpm ?? 1500),
    current: Number(sensor.current ?? 20)
  };

  console.log("Sending data to ML service:", payload);

  const response = await fetch(`${ML_SERVICE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();

  console.log(
    `ML service response: ${response.status}`,
    responseText
  );

  if (!response.ok) {
    throw new Error(
      `ML service returned ${response.status}: ${responseText}`
    );
  }

  return JSON.parse(responseText);
};

const getMachinePrediction = async (machineId) => {
  const machine = await Machine.findOne({
    machineId
  }).lean();

  if (!machine) {
    const error = new Error("Machine not found");
    error.statusCode = 404;
    throw error;
  }

  return predictMachine(machine);
};

module.exports = {
  predictMachine,
  getMachinePrediction
};