const {
  createSensorReading,
  getSensorReadings,
  getLatestSensorReading
} = require("../services/sensor.service");

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
  const limits =
    SENSOR_LIMITS[fieldName];

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

const createReading = async (
  req,
  res,
  next
) => {
  try {
    const {
      machineId,
      temperature,
      vibration,
      pressure,
      rpm,
      current,
      recordedAt
    } = req.body;

    if (!machineId) {
      return res.status(400).json({
        success: false,
        message: "machineId is required"
      });
    }

    validateSensorValue(
      temperature,
      "temperature"
    );

    validateSensorValue(
      vibration,
      "vibration"
    );

    validateSensorValue(
      pressure,
      "pressure"
    );

    validateSensorValue(
      rpm,
      "rpm"
    );

    validateSensorValue(
      current,
      "current"
    );

    let parsedRecordedAt;

    if (recordedAt !== undefined) {
      parsedRecordedAt =
        new Date(recordedAt);

      if (
        Number.isNaN(
          parsedRecordedAt.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "recordedAt must be a valid date"
        });
      }
    }

   const result =
  await createSensorReading({
    machineId,
    temperature,
    vibration,
    pressure,
    rpm,
    current,
    recordedAt:
      parsedRecordedAt
  });

res.status(201).json({
  success: true,

  message:
    "Sensor reading recorded and analyzed successfully",

  data: {
    reading: result.reading,

    prediction: {
      failureProbability:
        result.prediction.failureProbability,

      riskLevel:
        result.prediction.riskLevel,

      healthScore:
        result.prediction.healthScore,

      recommendation:
        result.prediction.recommendation,

      modelVersion:
        result.prediction.modelVersion,

      predictedAt:
        result.prediction.predictedAt
    }
  }
});
  } catch (error) {
    next(error);
  }
};

const getReadings = async (
  req,
  res,
  next
) => {
  try {
    const limit = Math.min(
      Math.max(
        Number.parseInt(
          req.query.limit,
          10
        ) || 50,
        1
      ),
      200
    );

    const readings =
      await getSensorReadings(
        req.params.machineId,
        limit
      );

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings
    });
  } catch (error) {
    next(error);
  }
};

const getLatestReading = async (
  req,
  res,
  next
) => {
  try {
    const reading =
      await getLatestSensorReading(
        req.params.machineId
      );

    if (!reading) {
      return res.status(404).json({
        success: false,
        message:
          "No sensor readings found for this machine"
      });
    }

    res.status(200).json({
      success: true,
      data: reading
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReading,
  getReadings,
  getLatestReading
};