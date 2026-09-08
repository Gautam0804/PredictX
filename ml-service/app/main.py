from fastapi import FastAPI

from .schemas import (
    SensorInput,
    PredictionResponse
)

from .predictor import predict_failure

from .anomaly import (
    AnomalyDetector,
    generate_normal_samples
)


app = FastAPI(
    title="PredictX ML Service",
    description=(
        "AI service for predictive maintenance"
    ),
    version="1.1.0"
)


anomaly_detector = AnomalyDetector()


@app.on_event("startup")
def train_anomaly_detector():
    samples = generate_normal_samples(
        count=1000
    )

    anomaly_detector.train(samples)


@app.get("/")
def root():
    return {
        "success": True,
        "message":
            "PredictX ML Service is running"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "predictx-ml",
        "status": "healthy"
    }


@app.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(sensor_data: SensorInput):
    result = predict_failure(
        sensor_data
    )

    return result


@app.post("/anomaly")
def detect_anomaly(
    sensor_data: SensorInput
):
    sensor_values = [
        sensor_data.temperature,
        sensor_data.vibration,
        sensor_data.pressure,
        sensor_data.rpm,
        sensor_data.current
    ]

    result = anomaly_detector.predict(
        sensor_values
    )

    return {
        "success": True,
        **result
    }