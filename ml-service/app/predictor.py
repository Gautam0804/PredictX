import numpy as np

from .model import load_model


FEATURES = [
    "temperature",
    "vibration",
    "pressure",
    "rpm",
    "current"
]


def calculate_health_score(
    temperature,
    vibration,
    pressure,
    rpm,
    current
):
    temperature_score = max(
        0,
        100 - abs(temperature - 70) * 2
    )

    vibration_score = max(
        0,
        100 - max(0, vibration - 2) * 25
    )

    pressure_score = max(
        0,
        100 - abs(pressure - 100) * 1.5
    )

    rpm_score = max(
        0,
        100 - abs(rpm - 1500) / 10
    )

    current_score = max(
        0,
        100 - abs(current - 20) * 3
    )

    health = (
        temperature_score
        + vibration_score
        + pressure_score
        + rpm_score
        + current_score
    ) / 5

    return round(max(0, min(100, health)), 2)


def get_risk_level(probability):
    if probability >= 0.80:
        return "CRITICAL"

    if probability >= 0.50:
        return "HIGH"

    if probability >= 0.25:
        return "MEDIUM"

    return "LOW"


def get_recommendation(risk_level):
    recommendations = {
        "LOW": "Machine operating normally. Continue routine monitoring.",
        "MEDIUM": "Increase monitoring frequency and inspect machine condition.",
        "HIGH": "Schedule preventive maintenance and inspect critical components.",
        "CRITICAL": "Immediate inspection required. Consider taking the machine offline."
    }

    return recommendations[risk_level]


def predict_failure(sensor_data):
    model = load_model()

    features = np.array([[
        sensor_data.temperature,
        sensor_data.vibration,
        sensor_data.pressure,
        sensor_data.rpm,
        sensor_data.current
    ]])

    if model is not None:
        probabilities = model.predict_proba(features)[0]

        failure_probability = float(probabilities[1])
    else:
        failure_probability = 0.0

    health_score = calculate_health_score(
        sensor_data.temperature,
        sensor_data.vibration,
        sensor_data.pressure,
        sensor_data.rpm,
        sensor_data.current
    )

    risk_level = get_risk_level(failure_probability)

    recommendation = get_recommendation(risk_level)

    return {
        "failure_probability": round(failure_probability, 4),
        "risk_level": risk_level,
        "health_score": health_score,
        "recommendation": recommendation
    }