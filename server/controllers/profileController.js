const Profile = require('../models/Profile');
const { fetchCrisisNews, fetchNearbyCenters } = require('../services/externalApi');

exports.getFullProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profilePromise = Profile.findById(id);

    const [profileResult] = await Promise.allSettled([profilePromise]);

    if (profileResult.status === 'rejected' || !profileResult.value) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profile = profileResult.value;
    const newsPromise = fetchCrisisNews(profile.specialization);
    const [lat, lng] = profile.coordinates || [28.6139, 77.2090];
    const centersPromise = fetchNearbyCenters(lat, lng);

    const [news, centers] = await Promise.allSettled([
      newsPromise,
      centersPromise
    ]);

    res.json({
      profile: profile,
      news: news.status === 'fulfilled' ? news.value : null,
      centers: centers.status === 'fulfilled' ? centers.value : null
    });

  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
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