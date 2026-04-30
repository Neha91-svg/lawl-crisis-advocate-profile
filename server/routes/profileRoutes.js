const express = require('express');
const router = express.Router();

const { getFullProfile } = require('../controllers/profileController');

router.get('/profile-full/:id', getFullProfile);

module.exports = router;