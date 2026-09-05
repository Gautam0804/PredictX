import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import CardHeader from "../common/CardHeader";
import { sensorData } from "../../data/dashboardData";

function SensorTrends() {
  return (
    <section className="dashboard-card sensor-trends-card">
      <CardHeader
        title="Sensor Trends"
        subtitle="Industrial Pump MX-003"
        action={
          <select className="chart-select">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        }
      />

      <div className="chart-legend">
        <span>
          <i className="legend-dot temperature" />
          Temperature
        </span>

        <span>
          <i className="legend-dot vibration" />
          Vibration
        </span>
      </div>

      <div className="sensor-chart">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={sensorData}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="vibration"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <Line
  type="monotone"
  dataKey="temperature"
  stroke="#2563eb"
  strokeWidth={2}
  dot={false}
/>

<Line
  type="monotone"
  dataKey="vibration"
  stroke="#8b5cf6"
  strokeWidth={2}
  dot={false}
/>
      </div>
    </section>
  );
}

export default SensorTrends;