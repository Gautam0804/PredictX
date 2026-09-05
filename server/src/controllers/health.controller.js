const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "PredictX API is healthy",
    service: "predictx-server",
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealth
};