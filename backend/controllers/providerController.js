const ProviderAssignment = require('../models/ProviderAssignment');
const User = require('../models/User');
const PatientProfile = require('../models/PatientProfile');
const DailyMetric = require('../models/DailyMetric');

// @desc    Get all patients assigned to provider
// @route   GET /api/provider/patients
// @access  Private/Provider
const getPatients = async (req, res) => {
    try {
        // 1. Get assignments for this provider
        // Note: In a real app, we would filter by req.user._id. 
        // For this MVP seed data, we'll just get all assignments or filter if we had the provider ID in request.
        // Since the seed script assigns patients to the seeded provider, we can try to find assignments.
        
        // Assuming the logged in user is the provider.
        const assignments = await ProviderAssignment.find({ provider_id: req.user._id })
            .populate('patient_id', 'email');

        // 2. For each assignment, get the patient profile (for name) and format the response
        const patientData = await Promise.all(assignments.map(async (assignment) => {
            const patientUser = assignment.patient_id;
            const profile = await PatientProfile.findOne({ user: patientUser._id });

            return {
                _id: patientUser._id,
                name: profile ? profile.name : 'Unknown',
                email: patientUser.email,
                compliant: assignment.compliance_status === 'Good'
            };
        }));

        res.json(patientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get patient details
// @route   GET /api/provider/patients/:id
// @access  Private/Provider
const getPatientDetails = async (req, res) => {
    try {
        const patientId = req.params.id;

        // 1. Get Patient Profile
        const profile = await PatientProfile.findOne({ user: patientId });
        
        // 2. Get Patient Metrics
        const metrics = await DailyMetric.find({ patient_id: patientId }).sort({ date: -1 });

        // 3. Get Compliance Status
        const assignment = await ProviderAssignment.findOne({ 
            provider_id: req.user._id, 
            patient_id: patientId 
        });

        if (!profile) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        res.json({
            profile,
            metrics,
            compliance_status: assignment ? assignment.compliance_status : 'Unknown'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPatients, getPatientDetails };
