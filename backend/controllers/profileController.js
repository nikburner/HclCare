const PatientProfile = require('../models/PatientProfile');

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    const profile = await PatientProfile.findOne({ user: req.user._id });

    if (profile) {
        res.json(profile);
    } else {
        res.status(404).json({ message: 'Profile not found' });
    }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    const { name, dob, allergies, medications } = req.body;

    const profileFields = {
        user: req.user._id,
        name,
        dob,
        allergies,
        medications,
    };

    let profile = await PatientProfile.findOne({ user: req.user._id });

    if (profile) {
        // Update
        profile = await PatientProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
        );
        return res.json(profile);
    }

    // Create
    profile = new PatientProfile(profileFields);
    await profile.save();
    res.json(profile);
};

module.exports = { getProfile, updateProfile };
