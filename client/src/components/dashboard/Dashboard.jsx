import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import MachineHealth from "./MachineHealth";
import AIPrediction from "./AIPrediction";
import SensorTrends from "./SensorTrends";
import RecentAlerts from "./RecentAlerts";
import AIInsight from "./AIInsight";
import PredictionHistory from "./PredictionHistory";
import { getDashboardData } from "../../api/dashboardApi";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboardData();

        setDashboardData(response.data);
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="coming-soon">
          <div className="coming-soon-icon">⏳</div>

          <h2>Loading Dashboard</h2>

          <p>
            Fetching machine data from the PredictX backend...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="coming-soon">
          <div className="coming-soon-icon">⚠️</div>

          <h2>Dashboard Unavailable</h2>

          <p>{error}</p>

          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};

  return (
    <div className="dashboard">
      <DashboardHeader />

      <section className="stats-grid">
        <StatCard
          title="Total Machines"
          value={stats.totalMachines ?? 0}
          subtitle="Registered machines"
        />

        <StatCard
          title="Healthy Machines"
          value={stats.healthyMachines ?? 0}
          subtitle="Operating normally"
        />

        <StatCard
          title="At Risk"
          value={stats.atRiskMachines ?? 0}
          subtitle="Needs attention"
        />

        <StatCard
          title="Critical"
          value={stats.criticalMachines ?? 0}
          subtitle="Immediate attention"
        />
      </section>

      <section className="main-grid">
        <MachineHealth machines={dashboardData?.machines || []} />

        <AIPrediction
          machines={dashboardData?.machines || []}
        />
      </section>

      <section className="bottom-grid">
       <SensorTrends
  machines={dashboardData?.machines || []}
/>

        <RecentAlerts
          machines={dashboardData?.machines || []}
        />
      </section>

<PredictionHistory
  machines={dashboardData?.machines || []}
/>
      <AIInsight
        machines={dashboardData?.machines || []}
      />
    </div>
  );
}

export default Dashboard;