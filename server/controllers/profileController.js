const Profile = require('../models/Profile');
const { fetchCrisisNews, fetchNearbyCenters } = require('../services/externalApi');

exports.getFullProfile = async (req, res) => {
  const { id } = req.params;

  // Set headers for streaming (NDJSON format)
  res.setHeader('Content-Type', 'application/x-ndjson');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    // 1. Fetch Profile first (High Priority)
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Stream the profile immediately to satisfy R4 (UI doesn't block)
    res.write(JSON.stringify({ type: 'profile', data: profile }) + '\n');

    // 2. Spawn external API calls in parallel (R3 Aggregation)
    const newsPromise = fetchCrisisNews(profile.specialization);
    const [lat, lng] = profile.coordinates || [28.6139, 77.2090];
    const centersPromise = fetchNearbyCenters(lat, lng);

    // Use Promise.allSettled but process each as it completes for true progressive loading
    const tasks = [
      newsPromise.then(data => {
        res.write(JSON.stringify({ type: 'news', data }) + '\n');
      }).catch(err => {
        res.write(JSON.stringify({ type: 'news', data: null, error: true }) + '\n');
      }),
      centersPromise.then(data => {
        res.write(JSON.stringify({ type: 'centers', data }) + '\n');
      }).catch(err => {
        res.write(JSON.stringify({ type: 'centers', data: null, error: true }) + '\n');
      })
    ];

    await Promise.allSettled(tasks);
    res.end();

  } catch (err) {
    console.error('Streaming Error:', err.message);
    // If headers haven't been sent, we can still send a standard error
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.end();
    }
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBasicProfile = async (req, res) => {
  try {
    const advocate = await Profile.findOne();
    res.json(advocate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};