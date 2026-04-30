function Credentials({ credentials }) {
  if (!credentials || credentials.length === 0) return null;

  return (
    <div className="profile-card">
      <h3 className="section-title">Credentials & Education</h3>
      <div className="credentials-list">
        {credentials.map((cred, index) => (
          <div key={index} className="credential-item">
            <h4>{cred.title}</h4>
            <p>{cred.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credentials;
