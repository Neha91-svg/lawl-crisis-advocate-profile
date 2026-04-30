import { useNavigate } from 'react-router-dom';

function AdvocateCard({ advocate }) {
  const navigate = useNavigate();

  return (
    <div className="card advocate-card d-flex flex-column" style={{ height: '100%' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="card-badge" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--primary-accent)', backgroundColor: 'var(--accent-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
          {advocate.experience}
        </div>
        <div style={{ fontWeight: '500' }}>⭐ 4.5</div>
      </div>
      <h3 style={{ marginBottom: '0.25rem' }}>{advocate.name}</h3>
      <p className="text-muted" style={{ fontWeight: '500', marginBottom: '0.5rem' }}>{advocate.specialization}</p>
      <div className="location-tag mb-4" style={{ fontSize: '0.9rem' }}>
        <span>📍 {advocate.location}</span>
      </div>
      
      <div style={{ marginTop: 'auto' }} className="d-flex flex-column gap-2">
        <button onClick={() => navigate(`/advocates/${advocate.id}`)} className="btn btn-outline w-100">
          View Profile
        </button>
        <button onClick={() => navigate(`/advocates/${advocate.id}?book=true`)} className="btn btn-primary w-100">
          Book Consultation
        </button>
      </div>
    </div>
  );
}

export default AdvocateCard;
