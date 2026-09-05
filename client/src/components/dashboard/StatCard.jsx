function StatCard({
  title,
  value,
  change,
  changeText,
  icon,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          {icon}
        </div>

        <span className="stat-title">
          {title}
        </span>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-footer">
        <span className="stat-change">
          {change}
        </span>

        <span className="stat-change-text">
          {changeText}
        </span>
      </div>
    </div>
  );
}

export default StatCard;