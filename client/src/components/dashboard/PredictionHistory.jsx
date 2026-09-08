import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  getPredictionHistory
} from "../../api/dashboardApi";

function PredictionHistory({
  machines = []
}) {
  const [selectedMachine, setSelectedMachine] =
    useState("");

  const [predictions, setPredictions] =
    useState([]);

  const [loading, setLoading] =
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

    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getPredictionHistory(
            selectedMachine,
            20
          );

        const formatted =
          [...(response.data || [])]
            .reverse()
            .map((item) => ({
              time: new Date(
                item.predictedAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }),

              probability: Math.round(
                (
                  item.failureProbability ?? 0
                ) * 100
              ),

              riskLevel:
                item.riskLevel
            }));

        setPredictions(formatted);
      } catch (err) {
        console.error(
          "Prediction history error:",
          err
        );

        setError(
          "Unable to load prediction history."
        );

        setPredictions([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [selectedMachine]);

  return (
    <section className="dashboard-card prediction-history-card">
      <div className="card-header">
        <div>
          <h3>Prediction History</h3>

          <p>
            Failure probability over time
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

      {loading && (
        <div className="chart-empty-state">
          Loading prediction history...
        </div>
      )}

      {!loading && error && (
        <div className="chart-empty-state">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        predictions.length === 0 && (
          <div className="chart-empty-state">
            No prediction history available.
            Run an AI prediction first.
          </div>
        )}

      {!loading &&
        !error &&
        predictions.length > 0 && (
          <div className="prediction-history-chart">
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart
                data={predictions}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="time"
                  tick={{
                    fontSize: 12
                  }}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{
                    fontSize: 12
                  }}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `${value}%`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="probability"
                  name="Failure Probability"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
    </section>
  );
}

export default PredictionHistory;