const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next, optional = false) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      if (!optional) {
        return res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  }

  if (!token && !optional) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  next();
};

module.exports = protect; // Exporting directly for use as require('../middleware/authMiddleware')
// Or if you want to support both:
// module.exports = { protect }; 
// Wait, I'll use the named export to match auth.js
module.exports = { protect };
