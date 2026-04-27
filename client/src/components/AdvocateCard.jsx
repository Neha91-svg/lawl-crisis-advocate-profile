import { useNavigate } from 'react-router-dom';

function AdvocateCard({ advocate }) {
  const navigate = useNavigate();

  return (
    <div className="card advocate-card" onClick={() => navigate(`/profile/${advocate.id}`)}>
      <div className="card-badge">{advocate.experience}</div>
      <h3>{advocate.name}</h3>
      <p className="specialization">{advocate.specialization}</p>
      <div className="location-tag">
        <span>📍 {advocate.location}</span>
      </div>
      <button className="btn-secondary" style={{ marginTop: '1.5rem', width: '100%' }}>
        View Full Profile
      </button>
    </div>
  );
}

export default AdvocateCard;
