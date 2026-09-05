const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const getDashboardData = async () => {
  return request("/dashboard");
};

export const getMachines = async () => {
  return request("/machines");
};