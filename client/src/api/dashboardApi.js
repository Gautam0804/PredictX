const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const request = async (endpoint) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.json();
};

export const getDashboardData = async () => {
  return request("/dashboard");
};

export const getMachines = async () => {
  return request("/machines");
};

export const getSensorReadings = async (
  machineId,
  limit = 50
) => {
  return request(
    `/sensors/${machineId}?limit=${limit}`
  );
};

export const getLatestSensorReading = async (
  machineId
) => {
  return request(
    `/sensors/${machineId}/latest`
  );
};

export const getMachineHealth = async (
  machineId
) => {
  return request(
    `/machine-health/${machineId}`
  );
};

export const createPrediction = async (
  machineId
) => {
  const response = await fetch(
    `${API_BASE_URL}/predictions/${machineId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    const message =
      await response.text();

    throw new Error(
      `Prediction request failed: ${response.status} ${message}`
    );
  }

  return response.json();
};

export const getLatestPrediction = async (
  machineId
) => {
  return request(
    `/predictions/${machineId}/latest`
  );
};

export const getPredictionHistory = async (
  machineId,
  limit = 20
) => {
  return request(
    `/predictions/${machineId}?limit=${limit}`
  );
};