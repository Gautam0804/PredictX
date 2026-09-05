import { Activity } from "lucide-react";

function ComingSoon({ page }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-icon">
        <Activity size={32} />
      </div>

      <h2>{page}</h2>

      <p>
        This module is part of the PredictX
        roadmap and will be implemented next.
      </p>
    </div>
  );
}

export default ComingSoon;