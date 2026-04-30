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
    <div className="profile-page-wrapper directory-page">
      <div className="profile-container">
        <header className="directory-header">
          <h1 className="directory-title">Legal Resource Hub</h1>
          <p className="directory-subtitle">
            Access verified legal templates, crisis response guides, and professional documentation checklists curated by our experts.
          </p>
        </header>

        {resources.length > 0 ? (
          <div className="advocates-grid">
            {resources.map((res) => (
              <div key={res.id} className="profile-card resource-card">
                <span className="card-spec-tag">
                  {res.category}
                </span>
                <h3>{res.title}</h3>
                <p className="text-muted">
                  {res.description}
                </p>
                <a href={res.link} className="btn btn-outline w-100">
                  Access Resource
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="error-fallback-card empty-state">
            <div className="error-icon">📚</div>
            <h3>Resource Library Under Maintenance</h3>
            <p>We are currently updating our resource library with the latest legal guides and templates. Please check back shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceHub;
