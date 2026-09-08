import os

import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)
from sklearn.model_selection import train_test_split


RANDOM_STATE = 42

MODEL_PATH = os.path.join(
    os.path.dirname(
        os.path.dirname(__file__)
    ),
    "models",
    "failure_model.joblib"
)


NORMAL_VALUES = {
    "temperature": 70,
    "vibration": 2,
    "pressure": 100,
    "rpm": 1500,
    "current": 20
}


def generate_dataset(
    count=5000,
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

    temperature_deviation = abs(
        temperature - NORMAL_VALUES["temperature"]
    )

    vibration_deviation = abs(
        vibration - NORMAL_VALUES["vibration"]
    )

    pressure_deviation = abs(
        pressure - NORMAL_VALUES["pressure"]
    )

    rpm_deviation = abs(
        rpm - NORMAL_VALUES["rpm"]
    )

    current_deviation = abs(
        current - NORMAL_VALUES["current"]
    )

    X = np.column_stack([
        temperature,
        vibration,
        pressure,
        rpm,
        current,

        temperature_deviation,
        vibration_deviation,
        pressure_deviation,
        rpm_deviation,
        current_deviation
    ])

    abnormal_conditions = (
        (temperature > 80)
        | (temperature < 60)
    ).astype(int)

    abnormal_conditions += (
        vibration > 3.5
    ).astype(int)

    abnormal_conditions += (
        (pressure > 110)
        | (pressure < 90)
    ).astype(int)

    abnormal_conditions += (
        (rpm > 1650)
        | (rpm < 1350)
    ).astype(int)

    abnormal_conditions += (
        (current > 26)
        | (current < 14)
    ).astype(int)

    y = (
        abnormal_conditions >= 2
    ).astype(int)

    noise = rng.random(count) < 0.05

    y = np.where(
        noise,
        1 - y,
        y
    )

    return X, y


def train_model():
    print("Generating training data...")

    X, y = generate_dataset()

    print(
        f"Dataset shape: {X.shape}"
    )

    print(
        f"Failure samples: {y.sum()}"
    )

    print(
        f"Normal samples: {(y == 0).sum()}"
    )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=RANDOM_STATE,
            stratify=y
        )
    )

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=RANDOM_STATE,
        class_weight="balanced",
        n_jobs=-1
    )

    print("Training Random Forest...")

    model.fit(
        X_train,
        y_train
    )

    predictions = model.predict(
        X_test
    )

    probabilities = model.predict_proba(
        X_test
    )[:, 1]

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    roc_auc = roc_auc_score(
        y_test,
        probabilities
    )

    print("\nModel Evaluation")
    print("----------------")
    print(
        f"Accuracy: {accuracy:.4f}"
    )

    print(
        f"ROC-AUC: {roc_auc:.4f}"
    )

    print("\nClassification Report")
    print(
        classification_report(
            y_test,
            predictions
        )
    )

    print("Confusion Matrix")

    print(
        confusion_matrix(
            y_test,
            predictions
        )
    )

    feature_names = [
        "temperature",
        "vibration",
        "pressure",
        "rpm",
        "current",

        "temperature_deviation",
        "vibration_deviation",
        "pressure_deviation",
        "rpm_deviation",
        "current_deviation"
    ]

    print("\nFeature Importance")

    for name, importance in zip(
        feature_names,
        model.feature_importances_
    ):
        print(
            f"{name}: {importance:.4f}"
        )

    os.makedirs(
        os.path.dirname(MODEL_PATH),
        exist_ok=True
    )

    joblib.dump(
        model,
        MODEL_PATH
    )

    print(
        f"\nModel saved to: {MODEL_PATH}"
    )


if __name__ == "__main__":
    train_model()