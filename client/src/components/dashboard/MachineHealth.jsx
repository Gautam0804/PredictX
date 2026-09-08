import { useEffect, useState } from "react";

import StatusBadge from "../common/StatusBadge";
import { getMachineHealth } from "../../api/dashboardApi";

function MachineHealth({ machines = [] }) {
  const [healthData, setHealthData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (machines.length === 0) {
      setHealthData([]);
      return;
    }

    const loadHealthData = async () => {
      try {
        setLoading(true);
        setError("");

        const results =
          await Promise.all(
            machines.map(async (machine) => {
              try {
                const response =
                  await getMachineHealth(
                    machine.machineId
                  );

                return response.data;
              } catch (err) {
                console.error(
                  `Health API error for ${machine.machineId}:`,
                  err
                );

                return {
                  machineId:
                    machine.machineId,

                  machineName:
                    machine.name,

                  status:
                    machine.status,

                  healthScore:
                    machine.healthScore ?? 0,

                  failureProbability:
                    machine.failureProbability ?? 0,

                  latestAnalysis: null
                };
              }
            })
          );

        setHealthData(results);
      } catch (err) {
        console.error(
          "Machine health error:",
          err
        );

        setError(
          "Unable to load machine health data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHealthData();
  }, [machines]);

  return (
    <section className="dashboard-card machine-health-card">
      <div className="card-header">
        <div>
          <h3>Machine Health</h3>

          <p>
            Current machine operating conditions
          </p>
        </div>

        <button className="view-all-button">
          View all
        </button>
      </div>

      {loading && (
        <div className="empty-state">
          Loading machine health...
        </div>
      )}

      {!loading && error && (
        <div className="empty-state">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        healthData.length === 0 && (
          <div className="empty-state">
            No machines available
          </div>
        )}

      {!loading &&
        !error &&
        healthData.length > 0 && (
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
                {healthData.map(
                  (machine) => (
                    <tr
                      key={
                        machine.machineId
                      }
                    >
                      <td>
                        <div className="machine-name">
                          <strong>
                            {
                              machine.machineName
                            }
                          </strong>

                          <span>
                            {
                              machine.machineId
                            }
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="health-value">
                          <span>
                            {Math.round(
                              machine.healthScore ??
                                0
                            )}
                            %
                          </span>

                          <div className="health-bar">
                            <div
                              className="health-bar-fill"
                              style={{
                                width: `${Math.max(
                                  0,
                                  Math.min(
                                    100,
                                    machine.healthScore ??
                                      0
                                  )
                                )}%`
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <StatusBadge
                          status={
                            machine.status
                          }
                        />
                      </td>

                      <td>
                        <span>
                          {Math.round(
                            (
                              machine.failureProbability ??
                              0
                            ) * 100
                          )}
                          %
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );
}

export default MachineHealth;