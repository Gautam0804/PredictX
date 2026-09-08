const Machine = require("../models/Machine");

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL ||
  "http://localhost:8000";

const buildSensorPayload = (sensor = {}) => {
  return {
    temperature: Number(
      sensor.temperature ?? 70
    ),

    vibration: Number(
      sensor.vibration ?? 2
    ),

    pressure: Number(
      sensor.pressure ?? 100
    ),

    rpm: Number(
      sensor.rpm ?? 1500
    ),

    current: Number(
      sensor.current ?? 20
    )
  };
};

const predictSensorData = async (
  sensor
) => {
  const payload =
    buildSensorPayload(sensor);

  console.log(
    "Sending sensor data to ML service:",
    payload
  );

  const response = await fetch(
    `${ML_SERVICE_URL}/predict`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(payload)
    }
  );

  const responseText =
    await response.text();

  console.log(
    `ML prediction response: ${response.status}`,
    responseText
  );

  if (!response.ok) {
    throw new Error(
      `ML service returned ${response.status}: ${responseText}`
    );
  }

  return JSON.parse(responseText);
};

const predictMachine = async (
  machine
) => {
  const sensor =
    machine.latestSensorData || {};

  return predictSensorData(sensor);
};

const getMachinePrediction = async (
  machineId
) => {
  const machine =
    await Machine.findOne({
      machineId
    }).lean();

  if (!machine) {
    const error = new Error(
      "Machine not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return predictMachine(machine);
};

const detectMachineAnomaly = async (
  machine
) => {
  const sensor =
    machine.latestSensorData || {};

  const payload =
    buildSensorPayload(sensor);

  const response = await fetch(
    `${ML_SERVICE_URL}/anomaly`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(payload)
    }
  );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `ML anomaly service returned ${response.status}: ${responseText}`
    );
  }

  return JSON.parse(responseText);
};

module.exports = {
  predictSensorData,
  predictMachine,
  getMachinePrediction,
  detectMachineAnomaly
};