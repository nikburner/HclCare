const mongoose = require('mongoose');

const providerAssignmentSchema = new mongoose.Schema({
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    compliance_status: {
        type: String,
        enum: ['Good', 'Missed'],
        default: 'Good',
    },
}, { timestamps: true });

const ProviderAssignment = mongoose.model('ProviderAssignment', providerAssignmentSchema);

module.exports = ProviderAssignment;
