//error component
function ErrorMessage({ message, type = 'general' }) {
  const icons = {
    news: '📰',
    location: '📍',
    general: '⚠️'
  };

  return (
    <div className="error-fallback-card">
      <div className="error-icon">{icons[type] || icons.general}</div>
      <h3>Data Temporarily Unavailable</h3>
      <p>{message || 'We are having trouble reaching this service. Please try again later.'}</p>
      <button className="btn-retry" onClick={() => window.location.reload()}>
        Retry Connection
      </button>
    </div>
  );
}

export default ErrorMessage;
