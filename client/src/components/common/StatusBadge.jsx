function StatusBadge({ status }) {
  const statusMap = {
    HEALTHY: {
      label: "Healthy",
      className: "status-healthy"
    },

    AT_RISK: {
      label: "At Risk",
      className: "status-warning"
    },

    CRITICAL: {
      label: "Critical",
      className: "status-critical"
    },

    OFFLINE: {
      label: "Offline",
      className: "status-offline"
    }
  };

  const current =
    statusMap[status] || {
      label: status || "Unknown",
      className: "status-offline"
    };

  return (
    <span className={`status-badge ${current.className}`}>
      <span className="status-dot" />
      {current.label}
    </span>
  );
}

export default StatusBadge;