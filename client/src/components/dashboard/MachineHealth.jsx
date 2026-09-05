import StatusBadge from "../common/StatusBadge";

function MachineHealth({ machines = [] }) {
  return (
    <section className="dashboard-card machine-health-card">
      <div className="card-header">
        <div>
          <h3>Machine Health</h3>
          <p>Current machine operating conditions</p>
        </div>

        <button className="view-all-button">
          View all
        </button>
      </div>

      <div className="table-wrapper">
        <table className="machine-table">
          <thead>
            <tr>
              <th>Machine</th>
              <th>Health</th>
              <th>Status</th>
              <th>Failure Risk</th>
            </tr>
          </thead>

          <tbody>
            {machines.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state">
                  No machines available
                </td>
              </tr>
            ) : (
              machines.map((machine) => (
                <tr key={machine._id}>
                  <td>
                    <div className="machine-name">
                      <strong>{machine.name}</strong>
                      <span>{machine.machineId}</span>
                    </div>
                  </td>

                  <td>
                    <div className="health-value">
                      <span>
                        {machine.healthScore ?? 0}%
                      </span>

                      <div className="health-bar">
                        <div
                          className="health-bar-fill"
                          style={{
                            width: `${machine.healthScore ?? 0}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <StatusBadge
                      status={machine.status}
                    />
                  </td>

                  <td>
                    <span>
                      {Math.round(
                        (machine.failureProbability ?? 0) * 100
                      )}
                      %
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MachineHealth;