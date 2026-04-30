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
    <div className="profile-page-wrapper directory-page">
      <div className="profile-container">
        
        <header className="directory-header">
          <h1 className="directory-title">Our Verified Advocates</h1>
          <p className="directory-subtitle">
            Browse our comprehensive directory of trusted legal professionals. Use the search and filters below to find the right advocate for your specific needs.
          </p>
        </header>

        {/* Search and Filter Section */}
        <section className="directory-filter-section">
          <div className="profile-card filter-card">
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">Search Professionals</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label className="filter-label">Filter by Specialization</label>
                <select
                  className="form-control"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Advocates Grid */}
        <div className="advocates-grid">
          {filteredAdvocates.length > 0 ? (
            filteredAdvocates.map(adv => (
              <AdvocateCard key={adv._id || adv.id} advocate={adv} />
            ))
          ) : (
            <div className="error-fallback-card empty-state">
              <div className="error-icon">🔍</div>
              <h3>No Results Found</h3>
              <p>We couldn't find any advocates matching "{search}" in the "{filter}" category. Try clearing your filters or searching for a different name.</p>
              <button className="btn btn-outline mt-3" onClick={() => { setSearch(''); setFilter('All'); }}>
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
