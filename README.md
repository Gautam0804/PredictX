# PredictX — AI-Powered Predictive Maintenance Platform

> An AI-powered predictive maintenance platform that analyzes machine sensor data, estimates equipment failure risk, monitors machine health, and supports proactive maintenance decisions.

PredictX combines **React, Node.js, Express.js, MongoDB, Python, FastAPI, and Machine Learning** into a full-stack predictive-maintenance system.

The goal is to move from **reactive maintenance** to **proactive, data-driven maintenance** by identifying potential equipment problems before they result in unexpected downtime.

---

## 🚀 Overview

Unexpected machine failures can result in:

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

The system uses this information to estimate **failure probability**, determine **risk level**, calculate a **machine health score**, and generate **maintenance recommendations**.

---

## 🎯 Core Concept

### Traditional Maintenance

```text
Machine
   ↓
Normal Operation
   ↓
Unexpected Failure
   ↓
Production Downtime
   ↓
Emergency Repair
   ↓
Higher Cost
```

### Predictive Maintenance

```text
Machine Sensors
      ↓
Sensor Data
      ↓
Backend Processing
      ↓
AI / ML Analysis
      ↓
Failure Probability
      ↓
Risk Classification
      ↓
Machine Health Score
      ↓
Maintenance Recommendation
      ↓
Preventive Action
      ↓
Reduced Unexpected Downtime
```

---

## 🏗️ Architecture

```text
                         PredictX
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   React Frontend     Node.js API       Python ML Service
   + JavaScript       + Express.js       + FastAPI
          │                 │                 │
          │                 ▼                 ▼
          │              MongoDB          ML Model
          │                 │
          └─────────────────┼─────────────────┘
                            │
                         Dashboard
```

### Production Architecture

```text
                         Internet
                            │
                            ▼
                 ┌─────────────────────┐
                 │   React Application │
                 │       Vercel        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Node.js/Express   │
                 │       Render        │
                 └────────┬─────┬──────┘
                          │     │
                          │     │ HTTP
                          │     ▼
                          │  ┌─────────────────┐
                          │  │ Python/FastAPI  │
                          │  │     Render      │
                          │  └────────┬────────┘
                          │           │
                          │           ▼
                          │       ML Model
                          │
                          ▼
                 ┌─────────────────────┐
                 │   MongoDB Atlas     │
                 └─────────────────────┘
```

---

## ✨ Current Features

### 📊 Machine Dashboard

The dashboard provides an operational overview of factory machines.

Current information includes:

- Total machines
- Healthy machines
- At-risk machines
- Critical machines
- Machine health scores
- Machine operating status
- Failure probability
- Sensor trend visualization
- Recent machine alerts
- AI-generated insights

---

### 🏭 Machine Management

The backend currently provides APIs for retrieving machine information.

```http
GET /api/machines
GET /api/machines/:id
```

Machine records include information such as:

- Machine ID
- Machine name
- Machine type
- Location
- Operating status
- Health score
- Failure probability
- Latest sensor data
- Maintenance information

---

### ❤️ Machine Health Monitoring

Machine health is represented using a score from **0–100**.

Example:

```text
94 → Healthy
72 → At Risk
38 → Critical
```

The current development health score is calculated from machine sensor conditions.

---

### 🤖 AI Failure Prediction

PredictX includes a separate Python machine-learning service exposed through FastAPI.

The prediction flow is:

```text
Node.js Backend
      ↓
POST /predict
      ↓
Python FastAPI
      ↓
Machine Learning Model
      ↓
Prediction
```

Example sensor input:

```json
{
  "temperature": 88,
  "vibration": 4.5,
  "pressure": 116,
  "rpm": 1200,
  "current": 30
}
```

Example prediction:

```json
{
  "failure_probability": 0.885,
  "risk_level": "CRITICAL",
  "health_score": 63.5,
  "recommendation": "Immediate inspection required. Consider taking the machine offline."
}
```

---

## 🚨 Risk Classification

PredictX currently classifies machine failure risk into four levels:

| Risk Level | Meaning |
|---|---|
| 🟢 LOW | Continue routine monitoring |
| 🟡 MEDIUM | Increase monitoring and inspect machine condition |
| 🟠 HIGH | Schedule preventive maintenance |
| 🔴 CRITICAL | Immediate inspection recommended |

Risk thresholds are currently defined inside the ML prediction service.

---

## 🔧 Maintenance Recommendations

The ML service generates recommendations based on the predicted risk level.

```text
LOW
→ Continue routine monitoring.

MEDIUM
→ Increase monitoring frequency and inspect machine condition.

HIGH
→ Schedule preventive maintenance and inspect critical components.

CRITICAL
→ Immediate inspection required and consider taking the machine offline.
```

---

## 🧠 Machine Learning Pipeline

The current development pipeline uses a **Random Forest classifier**.

```text
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
```

### Current Model Features

- Temperature
- Vibration
- Pressure
- RPM
- Electrical current

### Important ML Note

The current development model uses **synthetic data** to validate the end-to-end ML pipeline.

> Model performance using synthetic data should **not** be interpreted as real-world industrial prediction accuracy.

A real predictive-maintenance dataset and proper model evaluation are planned for a later development phase.

---

## 🔌 API

### Node.js / Express API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/dashboard` | Dashboard data |
| `GET` | `/api/machines` | Get all machines |
| `GET` | `/api/machines/:id` | Get a specific machine |
| `POST` | `/api/predictions/:machineId` | Generate machine prediction |

### Python / FastAPI API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | ML service health check |
| `POST` | `/predict` | Generate ML prediction |

---

## 🔄 End-to-End Prediction Flow

When a user requests a machine prediction:

```text
React Dashboard
      ↓
POST /api/predictions/:machineId
      ↓
Node.js + Express
      ↓
MongoDB
      ↓
Read Latest Sensor Values
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
Maintenance Recommendation
      ↓
Node.js
      ↓
React Dashboard
```

This architecture keeps the ML workload separated from the main backend and allows the prediction service to evolve independently.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- CSS
- Recharts
- Lucide React
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Helmet
- CORS
- Morgan
- dotenv

### AI / Machine Learning

- Python
- FastAPI
- NumPy
- Pandas
- Scikit-learn
- Joblib
- Random Forest

### Deployment

- GitHub
- Vercel
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
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
```

---

# ⚙️ Local Development

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Python 3
- MongoDB
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Gautam0804/predict-x.git
cd predict-x
```

> If the repository URL/name has changed, use the current GitHub repository URL.

---

## 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/predictx
CLIENT_URL=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## 4. Seed Development Data

From the `server` directory:

```bash
npm run seed
```

This creates development machine data for PredictX.

---

## 5. ML Service Setup

```bash
cd ml
python -m venv venv
```

### Windows

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Train the development model:

```bash
python -m app.train
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

ML service:

```text
http://localhost:8000
```

---

# ☁️ Deployment

The current deployment architecture is designed around separate services:

```text
React
  ↓
Vercel

Node.js + Express
  ↓
Render

Python + FastAPI
  ↓
Render

MongoDB
  ↓
MongoDB Atlas
```

Environment variables are configured independently for each service.

**No secrets or credentials should be committed to GitHub.**

---

# 🗺️ Development Roadmap

PredictX is being developed incrementally toward a production-oriented predictive-maintenance platform.

### Phase 1 — Core Platform

- [x] React dashboard
- [x] Node.js + Express backend
- [x] MongoDB integration
- [x] Machine APIs
- [x] Dashboard API
- [x] Python ML service
- [x] FastAPI prediction endpoint
- [x] Random Forest development model
- [x] Node.js → Python ML integration
- [x] Machine failure prediction
- [x] Risk classification
- [x] Health score
- [x] Maintenance recommendation

### Phase 2 — Sensor Data Platform

- [ ] Sensor reading ingestion API
- [ ] Historical sensor storage
- [ ] Sensor validation
- [ ] Machine telemetry history
- [ ] Real sensor trend charts
- [ ] Time-based filtering

### Phase 3 — Prediction Engine

- [ ] Prediction history
- [ ] Prediction timestamps
- [ ] Prediction audit trail
- [ ] Batch predictions
- [ ] Prediction confidence
- [ ] Failure prediction history

### Phase 4 — Anomaly Detection

Planned approach:

```text
Sensor Data
     ↓
Feature Processing
     ↓
Isolation Forest
     ↓
Anomaly Score
     ↓
Normal / Anomalous
```

Planned capabilities:

- Sensor anomaly detection
- Anomaly scoring
- Abnormal sensor identification
- Anomaly history
- Alert generation

### Phase 5 — Remaining Useful Life

```text
Historical Sensor Data
        ↓
Feature Engineering
        ↓
Regression Model
        ↓
Estimated RUL
        ↓
Maintenance Planning
```

Planned capabilities:

- RUL estimation
- Remaining useful hours/days
- RUL visualization
- Maintenance planning

### Phase 6 — Maintenance Management

- [ ] Maintenance tasks
- [ ] Engineer assignment
- [ ] Maintenance priority
- [ ] Due dates
- [ ] Maintenance status
- [ ] Maintenance history
- [ ] Preventive maintenance scheduling

### Phase 7 — Intelligent Alerts

- [ ] Automatic alert generation
- [ ] Alert history
- [ ] Alert acknowledgement
- [ ] Alert resolution
- [ ] Critical machine notifications

### Phase 8 — Authentication & Authorization

Planned roles:

```text
Admin
Maintenance Manager
Engineer
Operator
```

Planned capabilities:

- [ ] User registration
- [ ] Login
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] Protected APIs
- [ ] Protected dashboard pages

### Phase 9 — Analytics

Planned metrics:

- Machine uptime
- Downtime
- Failure frequency
- Maintenance frequency
- Failure prediction trends
- Sensor trends
- Machine health trends
- Maintenance cost estimation

### Phase 10 — Real Dataset & Model Evaluation

The current development model uses synthetic data.

The production-oriented ML phase will introduce a real predictive-maintenance dataset.

Planned work:

- [ ] Public predictive-maintenance dataset
- [ ] Data cleaning
- [ ] Exploratory data analysis
- [ ] Feature engineering
- [ ] Train / validation / test split
- [ ] Baseline model
- [ ] Random Forest comparison
- [ ] XGBoost comparison
- [ ] Hyperparameter tuning
- [ ] Cross-validation
- [ ] Precision / Recall
- [ ] F1-score
- [ ] ROC-AUC
- [ ] Confusion matrix
- [ ] Feature importance
- [ ] Model versioning

---

# 🧪 Testing Roadmap

Planned testing coverage includes:

### Backend

- Unit tests
- API tests
- Validation tests
- Error handling tests
- Authentication tests

### Machine Learning

- Input validation
- Prediction tests
- Model loading tests
- Model evaluation
- Edge-case testing

### Frontend

- Component testing
- API error states
- Loading states
- Dashboard behavior

### End-to-End

```text
React
  ↓
Express
  ↓
MongoDB
  ↓
FastAPI
  ↓
ML Model
```

---

# 🔐 Security Roadmap

Planned production security improvements:

- JWT authentication
- Role-based authorization
- Secure environment variables
- Request validation
- Rate limiting
- Helmet security headers
- CORS configuration
- API error handling
- Input sanitization
- Secure database configuration

---

# 🔮 Future Vision

PredictX is intended to evolve beyond a basic prediction dashboard into a broader industrial intelligence platform.

Future possibilities include:

- Real-time machine telemetry
- WebSocket-based live updates
- IoT sensor integration
- Edge inference
- Model monitoring
- Model drift detection
- Automated model retraining
- Email notifications
- Slack / Teams notifications
- Maintenance cost optimization
- Multi-plant support
- Machine comparison
- Advanced analytics
- AI-generated maintenance summaries

---

# 📌 Project Status

**Active Development**

The current version establishes a working end-to-end predictive-maintenance pipeline:

```text
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
```

The platform is being incrementally upgraded toward a more production-oriented predictive-maintenance system.

---

# 🎯 What This Project Demonstrates

PredictX brings together several areas of software engineering:

**Full-Stack Development**

- React
- JavaScript
- REST APIs
- Node.js
- Express.js
- MongoDB

**Machine Learning**

- Data preprocessing
- Feature engineering
- Classification
- Random Forest
- Model inference
- Model evaluation

**System Design**

- Service separation
- Backend / ML communication
- Database design
- API design
- Deployment architecture

---

# 👨‍💻 Author

## Gautam Yadav

**Software Engineer · Full-Stack Developer · AI/ML Enthusiast**

GitHub:  
https://github.com/Gautam0804

---

## ⭐ Project Vision

PredictX aims to evolve from a predictive-maintenance prototype into a production-oriented industrial intelligence platform capable of helping maintenance teams:

- Detect problems earlier
- Prioritize high-risk machines
- Plan preventive maintenance
- Monitor machine health
- Analyze operational trends
- Reduce unexpected equipment downtime

---

### Built with code, curiosity & chai ☕
