import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Hero from '../components/Hero'
import Credentials from '../components/Credentials'
import Timeline from '../components/Timeline'
import Contact from '../components/Contact'
import ContactForm from '../components/ContactForm'
import ErrorMessage from '../components/ErrorMessage'
import LeafletMap from '../components/LeafletMap'
import { SkeletonHero, SkeletonCard, SkeletonMap } from '../components/Skeleton'
import '../Profile.css'

function ProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [news, setNews] = useState(null)
  const [centers, setCenters] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingCenters, setLoadingCenters] = useState(true)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';

    axios.get(`${apiUrl}/api/profile-full/${id}`)
      .then(res => {
        setProfile(res.data.profile);
        setNews(res.data.news);
        setCenters(res.data.centers);

        setLoadingProfile(false);
        setLoadingNews(false);
        setLoadingCenters(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingProfile(false);
        setLoadingNews(false);
        setLoadingCenters(false);
      });

  }, [id]);

  return (
    <div className="profile-page-wrapper">
      {loadingProfile ? <SkeletonHero /> : <Hero profile={profile} />}

      <main className="profile-container profile-main-grid">
        
        {/* Sidebar Column */}
        <div className="sidebar-column">
          <Contact contact={profile?.contact} />
          <Credentials credentials={profile?.credentials} />
        </div>

        {/* Main Column */}
        <div className="main-column">
          <Timeline events={profile?.timeline} />

          <section>
            <h2 className="section-title">Latest Crisis News</h2>
            <div className="news-grid">
              {loadingNews ? (
                [1, 2, 3].map(i => <SkeletonCard key={i} />)
              ) : news ? (
                news.map((item, index) => (
                  <article key={index} className="news-card">
                    {item.image && <img src={item.image} alt="" className="news-image" />}
                    <div className="news-content">
                      <span className="news-tag">{item.source}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="news-footer">
                        <span>{item.date}</span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                          Read Full Article →
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <ErrorMessage type="news" message="Could not load the latest news articles." />
              )}
            </div>
          </section>

          <section>
            <h2 className="section-title">Nearby Resource Centers</h2>

            {!loadingCenters && centers && <LeafletMap centers={centers} userLocation={profile?.coordinates} />}
            {loadingCenters && <SkeletonMap />}

            <div className="news-grid mt-3">
              {loadingCenters ? (
                [1, 2].map(i => <SkeletonCard key={i} />)
              ) : centers ? (
                centers.map((center, index) => (
                  <div key={index} className="center-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3>{center.name}</h3>
                      <span className="rating-tag">⭐ {center.rating}</span>
                    </div>
                    <p>📍 {center.address}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <button className="news-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        View Directions
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <ErrorMessage type="location" message="Could not locate nearby resource centers." />
              )}
            </div>
          </section>

          <ContactForm />
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>© 2024 {profile?.name || 'Advocate Profile'}. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default ProfilePage;
