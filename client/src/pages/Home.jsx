import { useState, useEffect } from 'react';
import axios from 'axios';
import AdvocateCard from '../components/AdvocateCard';

function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    axios.get(`${apiUrl}/api/profiles`)
      .then(res => setAdvocates(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading directory...</div>;

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Crisis Advocate Directory</h1>
      <div className="credentials-grid">
        {advocates.map(adv => (
          <AdvocateCard key={adv.id} advocate={adv} />
        ))}
      </div>
    </div>
  );
}

export default Home;
