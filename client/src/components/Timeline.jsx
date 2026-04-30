function Timeline({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline-container">
      {events.map((evt, index) => (
        <div key={index} className="timeline-event">
          <div className="timeline-year">{evt.year}</div>
          <div className="timeline-body">{evt.event}</div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
