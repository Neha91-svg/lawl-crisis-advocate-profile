import { useNavigate } from 'react-router-dom';

function AdvocateCard({ advocate }) {
  const navigate = useNavigate();

  const id = advocate._id || advocate.id; // 🔥 safe fallback

  return (
    <div 
      className="card advocate-card d-flex flex-column"
      style={{ height: '100%', cursor: 'pointer' }}
      onClick={() => navigate(`/advocates/${id}`)}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="card-badge">
          {advocate.experience || '5+ yrs'}
        </div>
        <div>⭐ 4.5</div>
      </div>

      <h3>{advocate.name}</h3>

      <p className="text-muted">
        {advocate.specialization}
      </p>

      <div className="location-tag">
        📍 {advocate.location}
      </div>

      <div style={{ marginTop: 'auto' }} className="d-flex flex-column gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/advocates/${id}`);
          }} 
          className="btn btn-outline w-100"
        >
          View Profile
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/advocates/${id}?book=true`);
          }} 
          className="btn btn-primary w-100"
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}

export default AdvocateCard;