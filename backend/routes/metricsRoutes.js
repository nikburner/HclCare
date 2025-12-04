const express = require('express');
const router = express.Router();
const { logMetrics, getMetrics } = require('../controllers/metricsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, logMetrics).get(protect, getMetrics);

module.exports = router;
