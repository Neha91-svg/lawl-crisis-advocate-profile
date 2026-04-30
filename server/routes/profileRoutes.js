const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { getFullProfile, getAllProfiles, getBasicProfile } = require('../controllers/profileController');
const { createConsultation } = require('../controllers/consultationController');

// Rate Limiter for Consultation (R5: max 3 per hour per IP)
const consultationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  handler: (req, res, next, options) => {
    res.setHeader('Retry-After', Math.ceil(options.windowMs / 1000));
    res.status(429).json({
      error: 'Too many requests',
      message: 'Only 3 consultation requests are allowed per hour. Please try again later.'
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/profiles', getAllProfiles);
router.get('/profile-full/:id', getFullProfile);
router.get('/profile/basic', getBasicProfile);
router.post('/consultation', consultationLimiter, createConsultation);

module.exports = router;