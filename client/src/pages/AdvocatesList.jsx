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

  const specializations = ['All', 'Criminal Defense & Human Rights', 'Crisis Management & Legal Advocacy', 'Family Law & Civil Litigation', 'Corporate Crisis & Financial Law'];

  const filteredAdvocates = advocates.filter(adv => {
    const matchesFilter = filter === 'All' || adv.specialization === filter;
    const matchesSearch = adv.name.toLowerCase().includes(search.toLowerCase()) || 
                          adv.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading advocates...</div>;
  }

  return (
    <div className="container" style={{ padding: '4rem 15px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Our Verified Advocates</h1>
      <p className="text-muted text-center" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Browse our comprehensive directory of trusted legal professionals. Use the search and filters below to find the right advocate for your specific needs.
      </p>

      {/* Search and Filter */}
      <div className="card mb-4" style={{ padding: '1.5rem' }}>
        <div className="grid md:grid-cols-2" style={{ gap: '1rem' }}>
          <div>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
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

      {/* Advocates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAdvocates.length > 0 ? (
          filteredAdvocates.map(adv => (
            <AdvocateCard key={adv.id} advocate={adv} />
          ))
        ) : (
          <div className="text-center w-100 text-muted" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
            No advocates found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvocatesList;
