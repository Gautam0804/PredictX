import os
import joblib

from sklearn.ensemble import RandomForestClassifier


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "models",
    "failure_model.joblib"
)


def create_model():
    return RandomForestClassifier(
        n_estimators=150,
        random_state=42,
        class_weight="balanced"
    )


def save_model(model):
    joblib.dump(model, MODEL_PATH)


def load_model():
    if not os.path.exists(MODEL_PATH):
        return None

    return joblib.load(MODEL_PATH)