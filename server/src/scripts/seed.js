require("dotenv").config();

const connectDB = require("../config/db");
const Machine = require("../models/Machine");

const machines = [
  {
    machineId: "MCH-001",
    name: "CNC Machine 01",
    type: "CNC",
    location: "Production Floor A",
    status: "HEALTHY",
    healthScore: 94,
    failureProbability: 0.08,

    latestSensorData: {
      temperature: 68,
      vibration: 1.8,
      pressure: 98,
      rpm: 1510,
      current: 19,
      recordedAt: new Date()
    }
  },

  {
    machineId: "MCH-002",
    name: "Hydraulic Press 02",
    type: "Hydraulic Press",
    location: "Production Floor A",
    status: "AT_RISK",
    healthScore: 72,
    failureProbability: 0.46,

    latestSensorData: {
      temperature: 78,
      vibration: 3.1,
      pressure: 108,
      rpm: 1380,
      current: 25,
      recordedAt: new Date()
    }
  },

  {
    machineId: "MCH-003",
    name: "Compressor 03",
    type: "Compressor",
    location: "Production Floor B",
    status: "CRITICAL",
    healthScore: 38,
    failureProbability: 0.82,

    latestSensorData: {
      temperature: 88,
      vibration: 4.5,
      pressure: 116,
      rpm: 1200,
      current: 30,
      recordedAt: new Date()
    }
  },

  {
    machineId: "MCH-004",
    name: "Lathe Machine 04",
    type: "Lathe",
    location: "Production Floor B",
    status: "HEALTHY",
    healthScore: 91,
    failureProbability: 0.11,

    latestSensorData: {
      temperature: 69,
      vibration: 1.9,
      pressure: 101,
      rpm: 1490,
      current: 20,
      recordedAt: new Date()
    }
  },

  {
    machineId: "MCH-005",
    name: "Industrial Pump 05",
    type: "Pump",
    location: "Production Floor C",
    status: "AT_RISK",
    healthScore: 64,
    failureProbability: 0.57,

    latestSensorData: {
      temperature: 81,
      vibration: 3.7,
      pressure: 111,
      rpm: 1280,
      current: 27,
      recordedAt: new Date()
    }
  }
];

const seedDatabase = async () => {
  try {
    console.log("Starting PredictX database seed...");

    await connectDB();

    console.log("Connected to MongoDB.");

    await Machine.deleteMany({});

    console.log("Existing machines removed.");

    const insertedMachines = await Machine.insertMany(machines);

    console.log(
      `Inserted ${insertedMachines.length} machines.`
    );

    console.log("PredictX database seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Database seed failed:");
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();