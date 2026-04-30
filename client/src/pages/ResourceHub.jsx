import { useState, useEffect } from 'react';

function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch
    const timer = setTimeout(() => {
      setResources([
        {
          id: 1,
          title: 'Emergency Legal Rights Guide',
          description: 'A comprehensive guide on your rights during immediate legal crises and detention.',
          category: 'Legal Rights',
          link: '#'
        },
        {
          id: 2,
          title: 'Document Checklist for Litigation',
          description: 'Ensure you have all necessary documentation ready before meeting your advocate.',
          category: 'Documentation',
          link: '#'
        },
        {
          id: 3,
          title: 'Crisis Support Contacts',
          description: 'A directory of national and local helplines for immediate psychological and legal support.',
          category: 'Crisis Help',
          link: '#'
        }
      ]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-container" style={{ paddingTop: '4rem' }}>
          <h1 className="section-title">Resource Hub</h1>
          <div className="advocates-grid">
            <div className="skeleton-card" style={{ height: '200px', borderRadius: '12px', background: 'var(--bg-subtle)' }}></div>
            <div className="skeleton-card" style={{ height: '200px', borderRadius: '12px', background: 'var(--bg-subtle)' }}></div>
            <div className="skeleton-card" style={{ height: '200px', borderRadius: '12px', background: 'var(--bg-subtle)' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Resource Hub</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Access verified legal templates, crisis response guides, and professional documentation checklists.
          </p>
        </header>

        {resources.length > 0 ? (
          <div className="advocates-grid">
            {resources.map((res) => (
              <div key={res.id} className="profile-card resource-card">
                <span className="card-spec-tag" style={{ background: 'var(--bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  {res.category}
                </span>
                <h3 style={{ margin: '0.75rem 0', fontSize: '1.2rem', color: 'var(--primary)' }}>{res.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                  {res.description}
                </p>
                <a href={res.link} className="btn-card-outline" style={{ textDecoration: 'none' }}>
                  Access Resource
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-wrapper">
            <div className="empty-icon">📚</div>
            <h2>No resources available</h2>
            <p>We are currently updating our resource library. Please check back later for new legal guides and templates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceHub;
