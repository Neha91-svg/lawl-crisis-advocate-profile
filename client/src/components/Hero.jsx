function Hero({ profile }) {
  if (!profile) return null;

  return (
    <section className="hero-section">
      <div className="profile-container hero-content">
        <img src={profile.photo} alt={profile.name} className="hero-avatar" />
        <div className="hero-text-content">
          <h1 className="hero-name">{profile.name}</h1>
          <h2 className="hero-designation">{profile.designation}</h2>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <span aria-hidden="true">⚖️</span> {profile.specialization}
            </span>
            <span className="hero-meta-item">
              <span aria-hidden="true">📍</span> {profile.location}
            </span>
            <span className="hero-meta-item">
              <span aria-hidden="true">⏱️</span> {profile.experience}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
