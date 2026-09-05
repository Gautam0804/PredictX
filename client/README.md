# PredictX — AI-Powered Predictive Maintenance Platform

PredictX is a full-stack AI-powered predictive maintenance platform designed to help factories detect abnormal machine behavior, predict potential equipment failures, and support proactive maintenance decisions.

The platform combines a React dashboard, Node.js/Express backend, MongoDB database, and Python/FastAPI machine-learning service.

---

## 🚀 Project Overview

Unexpected machine failures can cause:

- Production downtime
- Emergency maintenance costs
- Equipment damage
- Reduced operational efficiency
- Delayed production schedules

PredictX addresses this problem by analyzing machine sensor data such as:

- Temperature
- Vibration
- Pressure
- RPM
- Electrical current

The system uses machine-learning models to estimate failure probability, determine machine risk level, calculate a machine health score, and provide maintenance recommendations.

---

## 🎯 Core Objective

The goal of PredictX is to transform traditional reactive maintenance into proactive predictive maintenance.

### Traditional Maintenance

```text
Machine
   ↓
Runs normally
   ↓
Unexpected failure
   ↓
Production downtime
   ↓
Emergency repair
   ↓
High cost
Predictive Maintenance
Machine Sensors
      ↓
Sensor Data
      ↓
Backend Processing
      ↓
AI/ML Analysis
      ↓
Failure Probability
      ↓
Risk Classification
      ↓
Maintenance Recommendation
      ↓
Preventive Action
      ↓
Reduced Unexpected Downtime
🏗️ System Architecture
                         PredictX
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        React Frontend   Node.js API    Python ML
        + JavaScript     + Express.js   + FastAPI
             │              │              │
             │              ▼              ▼
             │          MongoDB        ML Models
             │              │
             └──────────────┼──────────────┘
                            │
                         Dashboard
Production Architecture
                         Internet
                            │
                            ▼
                  ┌───────────────────┐
                  │ React Application │
                  │      Vercel       │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Node.js + Express │
                  │      Render       │
                  └───────┬─────┬─────┘
                          │     │
                          │     │ HTTP
                          │     ▼
                          │  ┌─────────────────┐
                          │  │ Python + FastAPI│
                          │  │     Render      │
                          │  └────────┬────────┘
                          │           │
                          │           ▼
                          │      ML Models
                          │
                          ▼
                  ┌───────────────────┐
                  │   MongoDB Atlas   │
                  └───────────────────┘
🛠️ Tech Stack
Frontend
React
JavaScript
Vite
CSS
Recharts
Lucide React
Fetch API
Backend
Node.js
Express.js
MongoDB
Mongoose
REST APIs
Helmet
CORS
Morgan
dotenv
AI / Machine Learning
Python
FastAPI
NumPy
Pandas
Scikit-learn
Joblib
Random Forest
Isolation Forest (planned)
XGBoost (planned)
Deployment
GitHub
Vercel
Render
MongoDB Atlas
✨ Current Features

The current version establishes the core full-stack and AI/ML pipeline.

📊 Machine Dashboard

The dashboard provides an operational overview of factory machines.

Current dashboard information includes:

Total machines
Healthy machines
At-risk machines
Critical machines
Machine health scores
Machine operating status
Failure probability
Sensor trend visualization
Recent machine alerts
AI-generated insights
🏭 Machine Management API

The backend currently provides APIs for retrieving machine information.

Available endpoints:

GET /api/machines
GET /api/machines/:id

Machine records contain information such as:

Machine ID
Machine Name
Machine Type
Location
Status
Health Score
Failure Probability
Latest Sensor Data
Maintenance Information
❤️ Health Monitoring

Machine health is represented using a score from 0–100.

Example:

94 → Healthy
72 → At Risk
38 → Critical

The current development health score is calculated from machine sensor conditions.

🤖 AI Failure Prediction

PredictX includes a Python machine-learning service exposed through FastAPI.

The Node.js backend sends sensor information to the ML service:

Node.js
   ↓
POST /predict
   ↓
Python FastAPI
   ↓
ML Model
   ↓
Prediction

Example sensor input:

{
  "temperature": 88,
  "vibration": 4.5,
  "pressure": 116,
  "rpm": 1200,
  "current": 30
}

Example prediction:

{
  "failure_probability": 0.885,
  "risk_level": "CRITICAL",
  "health_score": 63.5,
  "recommendation": "Immediate inspection required. Consider taking the machine offline."
}
🚨 Risk Classification

PredictX currently classifies machine failure risk into:

LOW
MEDIUM
HIGH
CRITICAL

Risk thresholds are currently defined inside the ML prediction service.

🔧 Maintenance Recommendations

The ML service provides recommendations based on predicted risk.

Example:

LOW
→ Continue routine monitoring.

MEDIUM
→ Increase monitoring frequency and inspect machine condition.

HIGH
→ Schedule preventive maintenance and inspect critical components.

CRITICAL
→ Immediate inspection required and consider taking the machine offline.
🧠 Machine Learning Pipeline

The current development ML pipeline uses a Random Forest classifier.

Sensor Data
     ↓
Feature Preparation
     ↓
Random Forest Classifier
     ↓
Failure Probability
     ↓
Risk Classification
     ↓
Health Score
     ↓
Maintenance Recommendation

Current model features:

Temperature
Vibration
Pressure
RPM
Current

The development model currently uses synthetic data to validate the end-to-end ML pipeline.

Important: Synthetic training data is used for development and pipeline validation. Model performance from synthetic data should not be interpreted as real-world industrial prediction accuracy.

A real predictive-maintenance dataset and proper validation will be introduced in a later development phase.

📁 Project Structure
PredictX/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── layout/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   │   ├── Machine.js
│   │   │   └── SensorReading.js
│   │   ├── routes/
│   │   ├── scripts/
│   │   │   └── seed.js
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── ml/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── predictor.py
│   │   ├── schemas.py
│   │   └── train.py
│   │
│   ├── data/
│   ├── models/
│   ├── requirements.txt
│   └── README.md
│
├── .gitignore
└── README.md
🔌 API Overview
Backend
Health Check
GET /api/health
Dashboard
GET /api/dashboard
Get All Machines
GET /api/machines
Get Machine
GET /api/machines/:id
Generate Machine Prediction
POST /api/predictions/:machineId
🐍 ML Service API
Health Check
GET /health
Prediction
POST /predict

Example:

{
  "temperature": 88,
  "vibration": 4.5,
  "pressure": 116,
  "rpm": 1200,
  "current": 30
}
⚙️ Local Development
Prerequisites

Install:

Node.js
npm
Python 3
MongoDB
Git
1. Clone Repository
git clone https://github.com/Gautam0804/PredictX.git
cd PredictX
2. Frontend Setup
cd client
npm install
npm run dev

Frontend:

http://localhost:5173

Create:

client/.env

Example:

VITE_API_URL=http://localhost:5000/api
3. Backend Setup
cd server
npm install

Create:

server/.env

Example:

PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/predictx
CLIENT_URL=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000

Start backend:

npm run dev

Backend:

http://localhost:5000
4. Database Seed

From the server directory:

npm run seed

This creates development machine data for PredictX.

5. ML Service Setup
cd ml

python -m venv venv

Windows:

.\venv\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt

Train the development model:

python -m app.train

Start FastAPI:

uvicorn app.main:app --reload --port 8000

ML service:

http://localhost:8000
🔄 End-to-End Request Flow

When a user requests a machine prediction:

React Dashboard
      ↓
POST /api/predictions/MCH-003
      ↓
Node.js + Express
      ↓
MongoDB
      ↓
Read latest sensor values
      ↓
Python FastAPI
      ↓
Random Forest Model
      ↓
Failure Probability
      ↓
Risk Level
      ↓
Health Score
      ↓
Recommendation
      ↓
Node.js
      ↓
React Dashboard
🗺️ Development Roadmap

PredictX will be developed incrementally as a production-oriented application.

Phase 1 — Production Baseline
 React dashboard
 Node.js + Express backend
 MongoDB integration
 Machine APIs
 Dashboard API
 Python ML service
 FastAPI prediction endpoint
 Random Forest development model
 Node.js → Python ML integration
 Machine failure prediction
 Risk classification
 Health score
 Maintenance recommendation
Phase 2 — Sensor Data Platform
 Sensor reading ingestion API
 Historical sensor storage
 Sensor reading validation
 Machine telemetry history
 Real sensor trend charts
 Time-based filtering
 Latest sensor state calculation
Phase 3 — Prediction Engine
 Prediction history
 Prediction timestamps
 Prediction audit trail
 Batch machine prediction
 Prediction confidence
 Failure prediction history
 Prediction status tracking
Phase 4 — Anomaly Detection

Introduce unsupervised anomaly detection.

Planned approach:

Sensor Data
     ↓
Feature Processing
     ↓
Isolation Forest
     ↓
Anomaly Score
     ↓
Normal / Anomalous

Planned capabilities:

 Sensor anomaly detection
 Anomaly score
 Abnormal sensor identification
 Anomaly history
 Anomaly dashboard
 Alert generation
Phase 5 — Remaining Useful Life

Introduce Remaining Useful Life estimation.

Historical Sensor Data
        ↓
Feature Engineering
        ↓
Regression Model
        ↓
Estimated RUL
        ↓
Maintenance Planning

Planned capabilities:

 RUL model
 Remaining useful hours/days
 RUL visualization
 Maintenance planning based on RUL
Phase 6 — Maintenance Management

Build a complete maintenance workflow.

Planned capabilities:

 Create maintenance task
 Assign engineer
 Maintenance priority
 Due date
 Maintenance status
 Maintenance history
 Machine maintenance timeline
 Preventive maintenance scheduling
Phase 7 — Intelligent Alerts

Planned alert levels:

LOW
MEDIUM
HIGH
CRITICAL

Planned capabilities:

 Automatic alert generation
 Alert history
 Alert acknowledgement
 Alert resolution
 Critical machine notifications
 Maintenance-triggered alerts
Phase 8 — Authentication & Authorization

Planned roles:

Admin
Maintenance Manager
Engineer
Operator

Planned capabilities:

 User registration
 Login
 JWT authentication
 Role-based access control
 Protected APIs
 Protected dashboard pages
Phase 9 — Analytics

Build an analytics layer for operational insights.

Planned metrics:

Machine uptime
Downtime
Failure frequency
Maintenance frequency
Failure prediction trends
Sensor trends
Machine health trends
Maintenance cost estimation
Prevented failure estimation
Phase 10 — Real ML Dataset & Model Evaluation

The development model currently uses synthetic data.

The production-oriented ML phase will introduce a real predictive-maintenance dataset.

Planned work:

 Select public predictive-maintenance dataset
 Data cleaning
 Exploratory data analysis
 Feature engineering
 Train/validation/test split
 Baseline model
 Random Forest comparison
 XGBoost comparison
 Hyperparameter tuning
 Cross-validation
 Precision/Recall
 F1-score
 ROC-AUC
 Confusion matrix
 Feature importance
 Model versioning
🧪 Testing Roadmap

Planned testing coverage:

Backend
Unit tests
API tests
Validation tests
Error handling tests
Authentication tests
ML
Input validation
Prediction tests
Model loading tests
Model evaluation
Edge-case testing
Frontend
Component testing
API error states
Loading states
Dashboard behavior
End-to-End
React
 ↓
Express
 ↓
MongoDB
 ↓
FastAPI
 ↓
ML Model
🔐 Security Roadmap

Planned production security improvements:

JWT authentication
Role-based authorization
Secure environment variables
Request validation
Rate limiting
Helmet security headers
CORS configuration
API error handling
Input sanitization
Secure database configuration
☁️ Deployment Roadmap

Production deployment will use:

Frontend
→ Vercel

Backend
→ Render

ML Service
→ Render

Database
→ MongoDB Atlas

Production environment variables will be configured separately for each service.

No secrets or credentials will be committed to GitHub.

📈 Future Product Improvements

Future versions may include:

Real-time machine telemetry
WebSocket-based live updates
IoT sensor integration
Edge inference
Model monitoring
Model drift detection
Automated retraining
Email notifications
Slack/Teams notifications
Maintenance cost optimization
Multi-plant support
Machine comparison
Advanced analytics
AI-generated maintenance summaries
💼 Resume Value

PredictX demonstrates experience across:

Full-Stack Development
React
JavaScript
REST APIs
Node.js
Express.js
MongoDB
API integration
Production architecture
Machine Learning
Data preprocessing
Feature engineering
Classification
Random Forest
Anomaly detection
Regression
Model evaluation
System Design
Microservice-style ML architecture
Backend/ML communication
Database design
API design
Production deployment
📌 Resume Description

Built an AI-powered predictive maintenance platform using React, Node.js, Express.js, MongoDB, Python, and FastAPI to analyze industrial machine sensor data, predict equipment failure risk, calculate machine health scores, and generate preventive maintenance recommendations.

🎤 Interview Explanation

A simple way to explain the architecture:

"PredictX is a full-stack predictive maintenance platform. React provides the operational dashboard, Node.js and Express handle APIs and business logic, MongoDB stores machine and sensor data, and a separate Python FastAPI service handles machine-learning inference. The backend sends sensor features to the ML service, receives the failure probability and risk classification, and exposes the result to the React application."

📜 Current Project Status

PredictX is actively under development.

The current version contains a working end-to-end predictive-maintenance pipeline:

React
  ↓
Node.js + Express
  ↓
MongoDB
  ↓
Python + FastAPI
  ↓
Machine Learning Model
  ↓
Prediction

The platform is being incrementally upgraded toward a production-ready predictive-maintenance system.

👨‍💻 Author

Gautam Yadav

GitHub:

https://github.com/Gautam0804

⭐ Project Vision

PredictX aims to evolve from a predictive-maintenance prototype into a production-oriented industrial intelligence platform capable of helping maintenance teams detect problems early, prioritize machines, schedule preventive maintenance, and reduce unexpected equipment downtime.

License

This project is currently developed as a portfolio and learning project.


### 🔥 Why I want this README before the first push

This gives your GitHub repo a **real product story**:

```text
Current Working System
        ↓
Clear Architecture
        ↓
ML Pipeline
        ↓
API Documentation
        ↓
Roadmap
        ↓
Production Deployment
        ↓
Continuous Improvements