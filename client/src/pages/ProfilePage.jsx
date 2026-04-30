import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Hero from '../components/Hero'
import Credentials from '../components/Credentials'
import Timeline from '../components/Timeline'
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
    const apiUrl = import.meta.env.VITE_API_URL || ''

    // Fetch Profile instantly
    axios.get(`${apiUrl}/api/profile/${id}`)
      .then(res => {
        const advocate = res.data
        setProfile(advocate)
        setLoadingProfile(false)

        // 1. Independently fetch News
        axios.get(`${apiUrl}/api/news`, { params: { specialization: advocate.specialization } })
          .then(newsRes => {
            setNews(newsRes.data)
            setLoadingNews(false)
          })
          .catch(err => {
            console.error('News error:', err)
            setNews(null)
            setLoadingNews(false)
          })

        // 2. Independently fetch Centers
        const [lat, lng] = advocate.coordinates || [28.6139, 77.2090]
        axios.get(`${apiUrl}/api/nearby-centers`, { params: { lat, lng } })
          .then(centersRes => {
            setCenters(centersRes.data)
            setLoadingCenters(false)
          })
          .catch(err => {
            console.error('Centers error:', err)
            setCenters(null)
            setLoadingCenters(false)
          })

      })
      .catch(err => {
        console.error('Profile error:', err)
        setLoadingProfile(false)
        setLoadingNews(false)
        setLoadingCenters(false)
      })

  }, [id])

  return (
    <div className="App">
      {loadingProfile ? <SkeletonHero /> : <Hero profile={profile} />}
      
      <main className="container">
        <Credentials credentials={profile?.credentials} />
        
        <section>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Latest Crisis News</h2>
          <div className="credentials-grid">
            {loadingNews ? (
              [1, 2, 3].map(i => <SkeletonCard key={i} />)
            ) : news ? (
              news.map((item, index) => (
                <div key={index} className="card">
                  <h3>{item.title}</h3>
                  <p><strong>Source:</strong> {item.source}</p>
                  <p>{item.date}</p>
                </div>
              ))
            ) : (
              <ErrorMessage type="news" message="Could not load the latest news articles." />
            )}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Nearby Resource Centers</h2>
          
          {!loadingCenters && centers && <LeafletMap centers={centers} userLocation={profile?.coordinates} />}
          {loadingCenters && <SkeletonMap />}

          <div className="credentials-grid">
            {loadingCenters ? (
              [1, 2].map(i => <SkeletonCard key={i} />)
            ) : centers ? (
              centers.map((center, index) => (
                <div key={index} className="card">
                  <h3>{center.name}</h3>
                  <p>{center.address}</p>
                  <p>Rating: {center.rating} ⭐</p>
                </div>
              ))
            ) : (
              <ErrorMessage type="location" message="Could not locate nearby resource centers." />
            )}
          </div>
        </section>

        <ContactForm />

        <Timeline events={profile?.timeline} />
      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>© 2024 {profile?.name || 'Advocate Neha'}. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default ProfilePage;
