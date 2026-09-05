from pydantic import BaseModel, Field


class SensorInput(BaseModel):
    temperature: float = Field(..., ge=0)
    vibration: float = Field(..., ge=0)
    pressure: float = Field(..., ge=0)
    rpm: float = Field(..., ge=0)
    current: float = Field(..., ge=0)


class PredictionResponse(BaseModel):
    failure_probability: float
    risk_level: str
    health_score: float
    recommendation: str