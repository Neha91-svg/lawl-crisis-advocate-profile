import { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || ''
        const response = await axios.get(`${apiUrl}/api/profile`)
        setProfile(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <div className="loading">Loading Profile...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="profile-card card">
      <h2>Professional Profile</h2>
      {profile && (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Specialization:</strong> {profile.specialization}</p>
          <p><strong>Experience:</strong> {profile.experience}</p>
          <p><strong>Location:</strong> {profile.location}</p>
        </div>
      )}
    </div>
  )
}

export default Profile
