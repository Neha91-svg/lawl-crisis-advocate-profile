const Consultation = require('../models/Consultation');

exports.createConsultation = async (req, res) => {
  try {
    const { name, phone, issue, timeSlot } = req.body;

    // Strict Server-Side Validation (R5)
    if (!name || !phone || !issue || !timeSlot) {
      return res.status(400).json({ error: 'All fields are required: name, phone, issue, timeSlot' });
    }

    if (issue.length > 300) {
      return res.status(400).json({ error: 'Issue description must not exceed 300 characters' });
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Generate Unique Reference ID: REF-XXXXXX
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `REF-${randomNum}`;

    const newConsultation = new Consultation({
      name,
      phone,
      issue,
      timeSlot,
      referenceId,
      userId: req.user ? req.user.id : null // Save user ID if authenticated
    });

    await newConsultation.save();

    res.status(201).json({
      message: 'Consultation request saved successfully',
      referenceId: referenceId,
      data: newConsultation
    });
  } catch (error) {
    console.error('Consultation Controller Error:', error.message);
    res.status(500).json({ error: 'Internal server error while saving consultation' });
  }
};

exports.getUserConsultations = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
    
    const consultations = await Consultation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
};
