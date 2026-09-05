import {
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

function AIInsight() {
  return (
    <section className="ai-insight">
      <div className="ai-insight-icon">
        <BrainCircuit size={21} />
      </div>

      <div className="ai-insight-content">
        <span>AI INSIGHT</span>

        <h3>
          MX-003 shows abnormal vibration
          patterns
        </h3>

        <p>
          The model detected a 34% increase in
          vibration over the last 6 hours. Bearing
          degradation is the most likely cause.
        </p>
      </div>

      <button className="ai-insight-action">
        View Prediction
        <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default AIInsight;