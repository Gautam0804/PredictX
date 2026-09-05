import os

import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)
from sklearn.model_selection import train_test_split

from .model import save_model


RANDOM_STATE = 42


def generate_dataset(n_samples=5000):
    rng = np.random.default_rng(RANDOM_STATE)

    temperature = rng.normal(70, 8, n_samples)
    vibration = rng.normal(2.2, 0.8, n_samples)
    pressure = rng.normal(100, 8, n_samples)
    rpm = rng.normal(1500, 180, n_samples)
    current = rng.normal(20, 4, n_samples)

    # Failure score based on abnormal sensor behavior.
    failure_score = (
        (temperature > 82).astype(int)
        + (vibration > 3.5).astype(int)
        + (pressure > 112).astype(int)
        + (rpm < 1250).astype(int)
        + (rpm > 1750).astype(int)
        + (current > 27).astype(int)
    )

    # Add a small amount of randomness.
    failure_score += rng.binomial(1, 0.08, n_samples)

    failure = (failure_score >= 2).astype(int)

    return pd.DataFrame({
        "temperature": temperature,
        "vibration": vibration,
        "pressure": pressure,
        "rpm": rpm,
        "current": current,
        "failure": failure
    })


def train():
    print("Generating training dataset...")

    df = generate_dataset()

    print(f"Dataset shape: {df.shape}")
    print("\nFailure distribution:")
    print(df["failure"].value_counts())

    features = [
        "temperature",
        "vibration",
        "pressure",
        "rpm",
        "current"
    ]

    X = df[features]
    y = df["failure"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=RANDOM_STATE,
        stratify=y
    )

    print("\nTraining Random Forest...")

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=RANDOM_STATE,
        class_weight="balanced",
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, predictions)
    roc_auc = roc_auc_score(y_test, probabilities)

    print("\n==============================")
    print("MODEL EVALUATION")
    print("==============================")

    print(f"Accuracy : {accuracy:.4f}")
    print(f"ROC-AUC  : {roc_auc:.4f}")

    print("\nClassification Report:")
    print(classification_report(y_test, predictions))

    print("Confusion Matrix:")
    print(confusion_matrix(y_test, predictions))

    print("\nFeature Importance:")

    importance = pd.DataFrame({
        "feature": features,
        "importance": model.feature_importances_
    }).sort_values(
        "importance",
        ascending=False
    )

    print(importance.to_string(index=False))

    save_model(model)

    print("\nModel saved successfully.")
    print("Location: models/failure_model.joblib")


if __name__ == "__main__":
    train()