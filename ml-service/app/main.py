from fastapi import FastAPI

from .schemas import SensorInput, PredictionResponse
from .predictor import predict_failure


app = FastAPI(
    title="PredictX ML Service",
    description="AI service for predictive maintenance",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "PredictX ML Service is running"
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
    result = predict_failure(sensor_data)

    return result