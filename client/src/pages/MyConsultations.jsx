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
    <div className="profile-page-wrapper">
      <div className="profile-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>My Consultations</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Track the status of your legal consultation requests and view your reference history.
          </p>
        </header>

        {consultations.length > 0 ? (
          <div className="advocates-grid">
            {consultations.map((consult) => (
              <div key={consult._id} className="profile-card consultation-card">
                <div className="consult-header">
                  <span className={`status-badge ${consult.status}`}>
                    {consult.status}
                  </span>
                  <span className="consult-date">
                    {new Date(consult.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="consult-name">{consult.name}</h3>
                <p className="consult-issue">{consult.issue}</p>
                
                <div className="consult-meta">
                  <div className="meta-item">
                    <span>🕒</span>
                    <span>{consult.timeSlot.charAt(0).toUpperCase() + consult.timeSlot.slice(1)} Session</span>
                  </div>
                  <div className="meta-item">
                    <span>📞</span>
                    <span>{consult.phone}</span>
                  </div>
                </div>

                <div className="ref-box" style={{ margin: '1.5rem 0 0 0', padding: '0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', marginBottom: '0.2rem', color: 'var(--text-dim)' }}>REFERENCE ID</p>
                  <code style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent)' }}>{consult.referenceId}</code>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-wrapper">
            <div className="empty-icon">📅</div>
            <h2>No consultation requests yet</h2>
            <p>You haven't booked any legal consultations. Our verified advocates are ready to help you with your legal needs.</p>
            <button className="btn-card-primary" onClick={() => navigate('/advocates')} style={{ width: 'auto', padding: '0.8rem 2rem' }}>
              Find an Advocate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyConsultations;
