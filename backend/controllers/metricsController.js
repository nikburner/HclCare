const DailyMetric = require('../models/DailyMetric');

// @desc    Log daily metrics
// @route   POST /api/metrics
// @access  Private
const logMetrics = async (req, res) => {
    const { steps_count, sleep_hours } = req.body;

    // Calculate goal met (e.g., steps > 6000)
    const goal_met = steps_count >= 6000;

    const metric = await DailyMetric.create({
        patient_id: req.user._id,
        steps_count,
        sleep_hours,
        goal_met,
    });

    if (metric) {
        res.status(201).json(metric);
    } else {
        res.status(400).json({ message: 'Invalid metric data' });
    }
};

// @desc    Get metrics for current user
// @route   GET /api/metrics
// @access  Private
const getMetrics = async (req, res) => {
    const metrics = await DailyMetric.find({ patient_id: req.user._id }).sort({ date: -1 });
    res.json(metrics);
};

module.exports = { logMetrics, getMetrics };
