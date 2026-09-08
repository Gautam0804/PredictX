const SENSOR_LIMITS = {
  temperature: {
    min: 0,
    max: 200
  },

  vibration: {
    min: 0,
    max: 50
  },

  pressure: {
    min: 0,
    max: 500
  },

  rpm: {
    min: 0,
    max: 10000
  },

  current: {
    min: 0,
    max: 500
  }
};

const validateSensorValue = (
  value,
  fieldName
) => {
  const limits = SENSOR_LIMITS[fieldName];

  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    const error = new Error(
      `${fieldName} must be a valid number`
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    value < limits.min ||
    value > limits.max
  ) {
    const error = new Error(
      `${fieldName} must be between ${limits.min} and ${limits.max}`
    );

    error.statusCode = 400;

    throw error;
  }
};