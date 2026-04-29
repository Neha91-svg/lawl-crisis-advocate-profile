function Timeline({ events }) {
  if (!events) return null;

  return (
    <section className="container">
      <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Professional Journey</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <h3>{event.year}</h3>
              <h4>{event.title}</h4>
              <p>{event.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Timeline
