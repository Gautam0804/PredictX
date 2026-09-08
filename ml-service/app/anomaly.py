import numpy as np
from sklearn.ensemble import IsolationForest


FEATURE_NAMES = [
    "temperature",
    "vibration",
    "pressure",
    "rpm",
    "current"
]


class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(
            n_estimators=150,
            contamination=0.10,
            random_state=42
        )

        self.is_trained = False

    def train(self, samples):
        data = np.array(samples)

        self.model.fit(data)

        self.is_trained = True

    def predict(self, sensor_values):
        if not self.is_trained:
            raise RuntimeError(
                "Anomaly detector is not trained"
            )

        data = np.array(
            [sensor_values]
        )

        prediction = self.model.predict(data)[0]

        score = self.model.decision_function(
            data
        )[0]

        return {
    "is_anomaly": bool(prediction == -1),
    "anomaly_score": float(score)
}


def generate_normal_samples(
    count=1000,
    random_state=42
):
    rng = np.random.default_rng(
        random_state
    )

    temperature = rng.normal(
        70, 5, count
    )

    vibration = rng.normal(
        2, 0.4, count
    )

    pressure = rng.normal(
        100, 5, count
    )

    rpm = rng.normal(
        1500, 80, count
    )

    current = rng.normal(
        20, 2, count
    )

    return np.column_stack(
        [
            temperature,
            vibration,
            pressure,
            rpm,
            current
        ]
    ).tolist()