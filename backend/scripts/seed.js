const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const PatientProfile = require('../models/PatientProfile');
const DailyMetric = require('../models/DailyMetric');
const ProviderAssignment = require('../models/ProviderAssignment');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log('Cleaning database...');
        await User.deleteMany({});
        await PatientProfile.deleteMany({});
        await DailyMetric.deleteMany({});
        await ProviderAssignment.deleteMany({});

        console.log('Creating users...');
        
        // Create Provider
        const provider = await User.create({
            email: 'provider@hcl.com',
            password: 'password123',
            role: 'provider',
            consent_agreed: true
        });

        // Create Patients
        const patient1 = await User.create({
            email: 'patient1@hcl.com',
            password: 'password123',
            role: 'patient',
            consent_agreed: true
        });

        const patient2 = await User.create({
            email: 'patient2@hcl.com',
            password: 'password123',
            role: 'patient',
            consent_agreed: true
        });

        console.log('Creating patient profiles...');
        await PatientProfile.create({
            user: patient1._id,
            name: 'John Doe',
            dob: new Date('1980-01-01'),
            allergies: ['Peanuts'],
            medications: ['Lisinopril']
        });

        await PatientProfile.create({
            user: patient2._id,
            name: 'Jane Smith',
            dob: new Date('1990-05-15'),
            allergies: ['Penicillin'],
            medications: ['Metformin']
        });

        console.log('Assigning patients to provider...');
        await ProviderAssignment.create([
            {
                provider_id: provider._id,
                patient_id: patient1._id,
                compliance_status: 'Good'
            },
            {
                provider_id: provider._id,
                patient_id: patient2._id,
                compliance_status: 'Missed'
            }
        ]);

        console.log('Creating daily metrics...');
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        await DailyMetric.create([
            // Patient 1 Metrics
            {
                patient_id: patient1._id,
                date: today,
                steps_count: 8500,
                sleep_hours: 7.5,
                goal_met: true
            },
            {
                patient_id: patient1._id,
                date: yesterday,
                steps_count: 9000,
                sleep_hours: 8,
                goal_met: true
            },
            {
                patient_id: patient1._id,
                date: twoDaysAgo,
                steps_count: 6000,
                sleep_hours: 6,
                goal_met: false
            },
            // Patient 2 Metrics
            {
                patient_id: patient2._id,
                date: today,
                steps_count: 4000,
                sleep_hours: 5,
                goal_met: false
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
