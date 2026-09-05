import {
  ArrowUpRight,
  AlertTriangle,
  Thermometer,
  Wrench,
} from "lucide-react";

import CardHeader from "../common/CardHeader";
import { alerts } from "../../data/dashboardData";

function RecentAlerts() {
  const getAlertIcon = (index) => {
    if (index === 0) {
      return <AlertTriangle size={17} />;
    }

    if (index === 1) {
      return <Thermometer size={17} />;
    }

    return <Wrench size={17} />;
  };

  return (
    <section className="dashboard-card alerts-card">
      <CardHeader
        title="Recent Alerts"
        subtitle="Latest machine events"
        action={
          <button className="view-all-button">
            View all
            <ArrowUpRight size={14} />
          </button>
        }
      />

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div
            className="alert-item"
            key={alert.id}
          >
            <div
              className={`alert-icon ${alert.severity.toLowerCase()}`}
            >
              {getAlertIcon(index)}
            </div>

            <div className="alert-content">
              <strong>{alert.title}</strong>
              <span>{alert.machine}</span>
              <small>{alert.time}</small>
            </div>

            <span
              className={`alert-severity ${alert.severity.toLowerCase()}`}
            >
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentAlerts;