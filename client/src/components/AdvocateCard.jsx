import { useNavigate } from 'react-router-dom';

function AdvocateCard({ advocate }) {
  const navigate = useNavigate();
  const id = advocate._id || advocate.id;

  // Fallback avatar if photo is missing
  const profileImage = advocate.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(advocate.name)}&background=1e3a8a&color=fff`;

  return (
    <div 
      className="advocate-directory-card"
      onClick={() => navigate(`/advocates/${id}`)}
    >
      <div className="card-image-wrapper">
        <img src={profileImage} alt={advocate.name} className="card-image" />
        <div className="card-badge-exp">
          {advocate.experience || '5+ Years'}
        </div>
      </div>

      <div className="card-body-main">
        <span className="card-spec-tag">{advocate.specialization}</span>
        <h3 className="card-name-title">{advocate.name}</h3>
        
        <div className="card-loc-item">
          <span>📍</span>
          <span>{advocate.location || 'Consultant'}</span>
        </div>

        <div className="card-footer-actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/advocates/${id}`);
            }} 
            className="btn-card-primary"
          >
            View Full Profile
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/advocates/${id}?book=true`);
            }} 
            className="btn-card-outline"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvocateCard;