const express = require('express');
const router = express.Router();
const { getPatients, getPatientDetails } = require('../controllers/providerController');
const { protect, provider } = require('../middleware/authMiddleware');

router.route('/patients').get(protect, provider, getPatients);
router.route('/patients/:id').get(protect, provider, getPatientDetails);

module.exports = router;
