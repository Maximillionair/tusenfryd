const express = require('express');
const path = require('path');
const router = express.Router();

// Import other route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const attractionRoutes = require('./attractionRoutes');

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/attractions', attractionRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Serve static files from the React app
router.use(express.static(path.join(__dirname, '../../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

module.exports = router; 