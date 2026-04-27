import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production, we'll use a relative path or an environment variable
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await axios.get(`${apiUrl}/api/test`)
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crisis Advocate Profile</h1>
        <div className="card">
          <h2>Backend Test Connection</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {data && (
            <div className="result">
              <p><strong>Message:</strong> {data.message}</p>
              <p><strong>Timestamp:</strong> {data.timestamp}</p>
              <p><strong>Status:</strong> {data.status}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
