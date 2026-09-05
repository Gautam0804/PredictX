function CardHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="card-header">
      <div>
        <h3>{title}</h3>

        {subtitle && (
          <p>{subtitle}</p>
        )}
      </div>

      {action && (
        <div className="card-header-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default CardHeader;