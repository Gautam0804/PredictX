const calculateHealthScore = ({
  temperature,
  vibration,
  pressure,
  rpm,
  current
}) => {
  const temperatureScore = Math.max(
    0,
    100 - Math.abs(temperature - 70) * 2
  );

  const vibrationScore = Math.max(
    0,
    100 -
      Math.max(0, vibration - 2) * 25
  );

  const pressureScore = Math.max(
    0,
    100 - Math.abs(pressure - 100) * 1.5
  );

  const rpmScore = Math.max(
    0,
    100 - Math.abs(rpm - 1500) / 10
  );

  const currentScore = Math.max(
    0,
    100 - Math.abs(current - 20) * 3
  );

  const health =
    (
      temperatureScore +
      vibrationScore +
      pressureScore +
      rpmScore +
      currentScore
    ) / 5;

  return Number(
    Math.max(
      0,
      Math.min(100, health)
    ).toFixed(2)
  );
};

const getRiskLevel = ({
  healthScore,
  isAnomaly
}) => {
  if (healthScore < 40) {
    return "CRITICAL";
  }

  if (healthScore < 60 || isAnomaly) {
    return "HIGH";
  }

  if (healthScore < 80) {
    return "MEDIUM";
  }

  return "LOW";
};

const getMachineStatus = (riskLevel) => {
  switch (riskLevel) {
    case "CRITICAL":
      return "CRITICAL";

    case "HIGH":
      return "AT_RISK";

    case "MEDIUM":
      return "AT_RISK";

    default:
      return "HEALTHY";
  }
};

module.exports = {
  calculateHealthScore,
  getRiskLevel,
  getMachineStatus
};