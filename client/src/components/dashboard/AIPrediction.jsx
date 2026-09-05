import {
  BrainCircuit,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

import CardHeader from "../common/CardHeader";

function AIPrediction() {
  return (
    <section className="dashboard-card ai-prediction-card">
      <CardHeader
        title="AI Prediction"
        subtitle="Highest risk machine"
        action={
          <button className="view-all-button">
            Details
            <ArrowUpRight size={14} />
          </button>
        }
      />

      <div className="prediction-machine">
        <div className="prediction-machine-icon">
          <BrainCircuit size={20} />
        </div>

        <div>
          <strong>Industrial Pump</strong>
          <span>MX-003</span>
        </div>

        <span className="prediction-risk">
          HIGH RISK
        </span>
      </div>

      <div className="prediction-score">
        <div className="prediction-score-value">
          <strong>82%</strong>
          <span>Failure Probability</span>
        </div>

        <div className="prediction-circle">
          <div className="prediction-circle-inner">
            82%
          </div>
        </div>
      </div>

      <div className="prediction-window">
        <div>
          <span>Estimated failure window</span>
          <strong>7–12 days</strong>
        </div>

        <AlertTriangle size={18} />
      </div>

      <div className="prediction-factors">
        <span>Contributing factors</span>

        <div className="factor-list">
          <span>High vibration</span>
          <span>Temperature rise</span>
          <span>RPM instability</span>
        </div>
      </div>

      <button className="maintenance-button">
        Create Maintenance Task
      </button>
    </section>
  );
}

export default AIPrediction;