const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { fetchCrisisNews, fetchNearbyCenters } = require('./services/externalApi');
const Consultation = require('./models/Consultation');
const advocates = require('./data/advocates');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crisis_advocate';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const consultationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, 
  message: {
    error: 'Too many requests',
    message: 'Only 3 consultation requests are allowed per hour. Please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});


app.get('/api/profiles', (req, res) => {
  res.json(advocates);
});

app.get('/api/profile/:id', async (req, res) => {
  const advocate = advocates.find(a => a.id === req.params.id);
  if (!advocate) {
    return res.status(404).json({ error: 'Advocate not found' });
  }

  try {
    const [lat, lng] = advocate.coordinates || [28.6139, 77.2090];
    // Parallel Fetching: Profile details, News, and Centers
    const [news, centers] = await Promise.all([
      fetchCrisisNews(advocate.specialization).catch(err => {
        console.error('News fetch error:', err.message);
        return null;
      }),
      fetchNearbyCenters(lat, lng).catch(err => {
        console.error('Centers fetch error:', err.message);
        return null;
      })
    ]);

    res.json({ ...advocate, recentNews: news, nearbyCenters: centers });
  } catch (error) {
    console.error('Unified Profile API Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/profile/basic', (req, res) => {
  // Default to Neha for backward compatibility or the first one
  res.json(advocates[0]);
});

app.get('/api/news', async (req, res) => {
  try {
    const news = await fetchCrisisNews(req.query.specialization);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/nearby-centers', async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const centers = await fetchNearbyCenters(lat || 28.6139, lng || 77.2090);
    res.json(centers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/consultation', consultationLimiter, async (req, res) => {
  try {
    const { name, phone, issue, timeSlot } = req.body;
    
    // Generate Unique Reference ID: REF-XXXXXX
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `REF-${randomNum}`;

    const newConsultation = new Consultation({
      name,
      phone,
      issue,
      timeSlot,
      referenceId
    });
    await newConsultation.save();
    res.status(201).json({ 
      message: 'Consultation request saved successfully', 
      referenceId: referenceId,
      data: newConsultation 
    });
  } catch (error) {
    console.error('Error saving consultation:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Crisis Advocate Profile API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
