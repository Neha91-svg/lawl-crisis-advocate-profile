import { useState, useEffect } from 'react';
import axios from 'axios';
import AdvocateCard from '../components/AdvocateCard';

function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    axios.get(`${apiUrl}/api/profiles`)
      .then(res => setAdvocates(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const specializations = ['All', 'Criminal Defense & Human Rights', 'Crisis Management & Legal Advocacy', 'Family Law & Civil Litigation', 'Corporate Crisis & Financial Law'];

  const filteredAdvocates = filter === 'All' 
    ? advocates 
    : advocates.filter(a => a.specialization === filter);

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--bg-card)', padding: '6rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Find Trusted Advocates Near You</h1>
          <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            Connect with verified legal professionals. Instant access to crisis management, family law, corporate defense, and more.
          </p>
        </div>
      </section>

      <main className="container" style={{ padding: '5rem 15px' }}>
        
        {/* Filter Section */}
        <div className="d-flex flex-column align-items-center mb-4">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Browse by Specialization</h2>
          <div className="d-flex gap-2" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {specializations.map(spec => (
              <button 
                key={spec}
                className={`btn ${filter === spec ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(spec)}
                style={{ fontSize: '0.9rem' }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Advocate Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 mb-4">
          {filteredAdvocates.length > 0 ? (
            filteredAdvocates.map(adv => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))
          ) : (
            <div className="text-center w-100 text-muted" style={{ gridColumn: '1 / -1', padding: '2rem' }}>
              No advocates found for this specialization.
            </div>
          )}
        </div>

        {/* Top Categories */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>Top Legal Categories</h2>
          <div className="grid md:grid-cols-3">
            {['Criminal Law', 'Property & Real Estate', 'Divorce & Family Law'].map((cat, idx) => (
              <div key={idx} className="card text-center" style={{ padding: '2rem 1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{cat}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Find experts specializing in {cat.toLowerCase()}.</p>
                <button className="btn btn-secondary mt-3">Explore</button>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Articles / Case History */}
        <section style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>Recent Legal Articles & Case Histories</h2>
          <div className="grid md:grid-cols-2">
            {[
              { title: 'Understanding Your Rights During Police Questioning', desc: 'A comprehensive guide on what to say and what to avoid when approached by law enforcement.' },
              { title: 'How to Navigate Property Disputes Without Court', desc: 'Mediation strategies that can save you years of litigation and significant legal fees.' }
            ].map((article, idx) => (
              <div key={idx} className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{article.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{article.desc}</p>
                <a href="#" style={{ fontSize: '0.9rem', fontWeight: '500', display: 'inline-block', marginTop: '0.5rem' }}>Read Article →</a>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;
