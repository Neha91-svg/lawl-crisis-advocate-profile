import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

function MyConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || '';
        
        const res = await axios.get(`${apiUrl}/api/consultations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setConsultations(res.data);
      } catch (err) {
        console.error('Failed to fetch consultations:', err);
        setError('We couldn\'t load your consultation history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-container" style={{ paddingTop: '4rem' }}>
          <h1 className="section-title">My Consultations</h1>
          <div className="advocates-grid">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-container" style={{ paddingTop: '4rem' }}>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper directory-page">
      <div className="profile-container">
        <header className="directory-header">
          <h1 className="directory-title">My Consultations</h1>
          <p className="directory-subtitle">
            Track the status of your legal consultation requests and view your communication history with verified professionals.
          </p>
        </header>

        {consultations.length > 0 ? (
          <div className="advocates-grid">
            {consultations.map((consult) => (
              <div key={consult._id} className="profile-card consultation-card">
                <div className="consult-header">
                  <span className={`status-badge ${consult.status.toLowerCase()}`}>
                    {consult.status}
                  </span>
                  <span className="consult-date">
                    {new Date(consult.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="consult-name">{consult.name}</h3>
                <p className="consult-issue text-muted">{consult.issue}</p>
                
                <div className="consult-meta">
                  <div className="meta-item">
                    <span aria-hidden="true">🕒</span>
                    <span>{consult.timeSlot.charAt(0).toUpperCase() + consult.timeSlot.slice(1)} Session</span>
                  </div>
                  <div className="meta-item">
                    <span aria-hidden="true">📞</span>
                    <span>{consult.phone}</span>
                  </div>
                </div>

                <div className="ref-box-container">
                  <p className="ref-label">REFERENCE ID</p>
                  <code className="ref-code">{consult.referenceId}</code>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="error-fallback-card empty-state">
            <div className="error-icon">📅</div>
            <h3>No Consultations Found</h3>
            <p>You haven't booked any legal consultations yet. Our verified advocates are ready to assist you.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/advocates')}>
              Find an Advocate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyConsultations;
