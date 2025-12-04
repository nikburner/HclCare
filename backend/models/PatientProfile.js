const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    allergies: [{
        type: String,
    }],
    medications: [{
        type: String,
    }],
}, { timestamps: true });

const PatientProfile = mongoose.model('PatientProfile', patientProfileSchema);

module.exports = PatientProfile;
