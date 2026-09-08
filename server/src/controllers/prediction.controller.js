const {
  createPrediction,
  getPredictionHistory,
  getLatestPrediction
} = require("../services/prediction.service");

const predictForMachine = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await createPrediction(
        req.params.machineId
      );

    res.status(201).json({
      success: true,

      data: {
        machineId:
          req.params.machineId,

        ...result.prediction,

        predictionId:
          result.predictionRecord._id,

        predictedAt:
          result.predictionRecord.predictedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPredictions = async (
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

    const predictions =
      await getPredictionHistory(
        req.params.machineId,
        limit
      );

    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    next(error);
  }
};

const getLatest = async (
  req,
  res,
  next
) => {
  try {
    const prediction =
      await getLatestPrediction(
        req.params.machineId
      );

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message:
          "No predictions found for this machine"
      });
    }

    res.status(200).json({
      success: true,
      data: prediction
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  predictForMachine,
  getPredictions,
  getLatest
};