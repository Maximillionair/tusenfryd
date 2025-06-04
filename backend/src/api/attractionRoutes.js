const express = require('express');
const router = express.Router();

// Attraction management routes
router.get('/', (req, res) => {
  // TODO: Implement get all attractions
  res.json({ message: 'Get all attractions endpoint' });
});

router.get('/:id', (req, res) => {
  // TODO: Implement get single attraction
  res.json({ message: `Get attraction ${req.params.id} endpoint` });
});

router.get('/:id/wait-times', (req, res) => {
  // TODO: Implement get attraction wait times
  res.json({ message: `Get wait times for attraction ${req.params.id} endpoint` });
});

module.exports = router; 