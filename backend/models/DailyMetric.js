const mongoose = require('mongoose');

const dailyMetricSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    steps_count: {
        type: Number,
        required: true,
    },
    sleep_hours: {
        type: Number,
        required: true,
    },
    goal_met: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const DailyMetric = mongoose.model('DailyMetric', dailyMetricSchema);

module.exports = DailyMetric;
