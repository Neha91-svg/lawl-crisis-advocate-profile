function Credentials({ credentials }) {
  if (!credentials) return null;

  return (
    <section className="container">
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Core Credentials</h2>
      <div className="credentials-grid">
        {credentials.map((cert, index) => (
          <div key={index} className="card">
            <h3>{cert.title}</h3>
            <p>{cert.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Credentials
