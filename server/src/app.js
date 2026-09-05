const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const machineRoutes = require("./routes/machine.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const predictionRoutes = require("./routes/prediction.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PredictX API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/predictions", predictionRoutes);

app.use(errorHandler);

module.exports = app;