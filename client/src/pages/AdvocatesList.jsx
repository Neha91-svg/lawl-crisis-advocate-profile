import { useState, useEffect } from 'react';
import axios from 'axios';
import AdvocateCard from '../components/AdvocateCard';

function AdvocatesList() {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    axios.get(`${apiUrl}/api/profiles`)
      .then(res => setAdvocates(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const specializations = [
    'All', 
    'Criminal Law', 
    'Corporate Law', 
    'Family Law', 
    'Civil Litigation'
  ];

  const filteredAdvocates = advocates.filter(adv => {
    // Safely extract and normalize fields to prevent crashes
    const name = (adv.name || '').toLowerCase().trim();
    const location = (adv.location || '').toLowerCase().trim();
    const specialization = (adv.specialization || '').toLowerCase().trim();
    
    const searchTerm = search.toLowerCase().trim();
    const filterTerm = filter.toLowerCase().trim();

    // Fix 1: Robust filtering for "All" and partial matches
    const matchesFilter = filterTerm === 'all' || specialization === filterTerm;

    // Fix 2: Multi-field search (Name or Location)
    const matchesSearch = name.includes(searchTerm) || location.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="profile-page-wrapper" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading advocates...</div>;
  }

  return (
    <div className="profile-page-wrapper" style={{ paddingBottom: '4rem' }}>
      <div className="profile-container" style={{ paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', color: 'var(--primary)' }}>Our Verified Advocates</h1>
        <p style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Browse our comprehensive directory of trusted legal professionals. Use the search and filters below to find the right advocate for your specific needs.
        </p>

        {/* Search and Filter Section */}
        <div className="profile-card" style={{ marginBottom: '3rem', padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Search Professionals</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Filter by Specialization</label>
              <select
                className="form-control"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advocates Grid - Responsive & Equal Heights */}
        <div className="advocates-grid">
          {filteredAdvocates.length > 0 ? (
            filteredAdvocates.map(adv => (
              <AdvocateCard key={adv._id || adv.id} advocate={adv} />
            ))
          ) : (
            <div className="error-fallback-card" style={{ gridColumn: '1 / -1' }}>
              <div className="error-icon">🔍</div>
              <h3>No Results Found</h3>
              <p>We couldn't find any advocates matching "{search}" in the "{filter}" category. Try clearing your filters or searching for a different name.</p>
              <button className="btn-retry" onClick={() => { setSearch(''); setFilter('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvocatesList;
