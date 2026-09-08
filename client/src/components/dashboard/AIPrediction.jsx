import { useEffect, useState } from "react";

import {
  createPrediction,
  getLatestPrediction
} from "../../api/dashboardApi";

function AIPrediction({ machines = [] }) {
  const [selectedMachine, setSelectedMachine] =
    useState("");

  const [prediction, setPrediction] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [initialLoading, setInitialLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      machines.length > 0 &&
      !selectedMachine
    ) {
      setSelectedMachine(
        machines[0].machineId
      );
    }
  }, [machines, selectedMachine]);

  useEffect(() => {
    if (!selectedMachine) {
      return;
    }

    const loadLatestPrediction =
      async () => {
        try {
          setInitialLoading(true);
          setError("");

          const response =
            await getLatestPrediction(
              selectedMachine
            );

          setPrediction(response.data);
        } catch (err) {
          if (
            err.message.includes("404")
          ) {
            setPrediction(null);
            setError("");
          } else {
            console.error(
              "Latest prediction error:",
              err
            );

            setError(
              "Unable to load prediction."
            );
          }
        } finally {
          setInitialLoading(false);
        }
      };

    loadLatestPrediction();
  }, [selectedMachine]);

  const handlePrediction = async () => {
    if (!selectedMachine) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await createPrediction(
          selectedMachine
        );

      setPrediction(response.data);
    } catch (err) {
      console.error(
        "Prediction error:",
        err
      );

      setError(
        "Unable to generate prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  const probability =
    prediction?.failure_probability ??
    prediction?.failureProbability ??
    0;

  const probabilityPercent =
    Math.round(probability * 100);

  const riskLevel =
    prediction?.risk_level ??
    prediction?.riskLevel ??
    "LOW";

  const recommendation =
    prediction?.recommendation ??
    "Run an AI prediction to analyze this machine.";

  const riskClass =
    riskLevel.toLowerCase();

  return (
    <section className="dashboard-card ai-prediction-card">
      <div className="card-header">
        <div>
          <h3>AI Prediction</h3>

          <p>
            Machine failure risk analysis
          </p>
        </div>

        <select
          value={selectedMachine}
          onChange={(event) =>
            setSelectedMachine(
              event.target.value
            )
          }
          className="machine-selector"
        >
          {machines.map((machine) => (
            <option
              key={machine.machineId}
              value={machine.machineId}
            >
              {machine.machineId}
            </option>
          ))}
        </select>
      </div>

      {initialLoading ? (
        <div className="ai-prediction-loading">
          Loading latest prediction...
        </div>
      ) : (
        <div className="ai-prediction-body">

          {/* Main prediction */}
          <div className="prediction-main">
            <span className="prediction-main-label">
              Failure Probability
            </span>

            <div className="prediction-main-value">
              {probabilityPercent}%
            </div>

            <span
              className={`prediction-risk-badge ${riskClass}`}
            >
              {riskLevel}
            </span>
          </div>

          {/* Probability bar */}
          <div className="prediction-progress-section">
            <div className="prediction-progress-header">
              <span>Risk assessment</span>

              <span>
                {probabilityPercent}%
              </span>
            </div>

            <div className="prediction-progress">
              <div
                className={`prediction-progress-fill ${riskClass}`}
                style={{
                  width: `${probabilityPercent}%`
                }}
              />
            </div>
          </div>

          {/* Recommendation */}
          <div className="prediction-recommendation">
            <div className="recommendation-label">
              AI Recommendation
            </div>

            <p>
              {recommendation}
            </p>
          </div>

          {error && (
            <div className="prediction-error">
              {error}
            </div>
          )}

          <button
            type="button"
            className="primary-button prediction-button"
            onClick={handlePrediction}
            disabled={
              loading ||
              !selectedMachine
            }
          >
            {loading
              ? "Analyzing..."
              : "Run AI Prediction"}
          </button>

          {prediction?.predictedAt && (
            <div className="prediction-timestamp">
              Last analyzed{" "}
              {new Date(
                prediction.predictedAt
              ).toLocaleString([], {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default AIPrediction;