function Timeline({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="profile-card">
      <h3 className="section-title">Professional Experience</h3>
      <div className="timeline-container">
        {events.map((evt, index) => (
          <div key={index} className="timeline-event">
            <div className="timeline-year">{evt.year}</div>
            <div className="timeline-body">{evt.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
