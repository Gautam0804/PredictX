import { Plus } from "lucide-react";

function DashboardHeader() {
  return (
    <section className="dashboard-header">
      <div>
        <span className="dashboard-eyebrow">
          OPERATIONS OVERVIEW
        </span>

        <h1>Good evening, Plant Admin</h1>

        <p>
          Here's what's happening across your
          manufacturing plant.
        </p>
      </div>

      <button className="primary-button">
        <Plus size={17} />
        Add Machine
      </button>
    </section>
  );
}

export default DashboardHeader;