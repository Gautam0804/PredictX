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

import { getSensorReadings } from "../../api/dashboardApi";

function SensorTrends() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const machineId = "MCH-003";

  useEffect(() => {
    const loadSensorData = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getSensorReadings(
            machineId,
            20
          );

        const formattedData = [
          ...(response.data || [])
        ]
          .reverse()
          .map((reading) => ({
            time: new Date(
              reading.recordedAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),

            temperature: reading.temperature,
            vibration: reading.vibration
          }));

        setReadings(formattedData);
      } catch (err) {
        console.error(
          "Sensor API error:",
          err
        );

        setError(
          "Unable to load sensor data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSensorData();
  }, []);

  return (
    <section className="dashboard-card sensor-trends-card">
      <div className="card-header">
        <div>
          <h3>Sensor Trends</h3>
          <p>
            Temperature and vibration history
          </p>
        </div>

        <span className="sensor-machine-label">
          {machineId}
        </span>
      </div>

      {loading && (
        <div className="chart-empty-state">
          Loading sensor data...
        </div>
      )}

      {!loading && error && (
        <div className="chart-empty-state">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        readings.length === 0 && (
          <div className="chart-empty-state">
            No sensor readings available.
          </div>
        )}

      {!loading &&
        !error &&
        readings.length > 0 && (
          <div className="sensor-chart">
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart
                data={readings}
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
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="vibration"
                  name="Vibration"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
    </section>
  );
}

export default SensorTrends;