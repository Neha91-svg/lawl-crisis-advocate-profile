const NodeCache = require('node-cache');

// Initialize cache
// stdTTL: 0 means keys never expire by default (we will set them per key)
// checkperiod: period in seconds to check for expired keys
const apiCache = new NodeCache({ stdTTL: 0, checkperiod: 60 });

const CACHE_KEYS = {
  NEWS: 'crisis_news',
  LOCATIONS: 'nearby_centers'
};

const TTL = {
  NEWS: 600, // 10 minutes in seconds
  LOCATIONS: 3600 // 1 hour in seconds
};

module.exports = {
  apiCache,
  CACHE_KEYS,
  TTL
};
