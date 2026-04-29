function Hero({ profile }) {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>{profile?.name || 'Loading...'}</h1>
        <p>{profile?.specialization || 'Professional Advocate'}</p>
        <div className="hero-stats">
          <span>{profile?.experience} Experience</span> • <span>{profile?.location}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
