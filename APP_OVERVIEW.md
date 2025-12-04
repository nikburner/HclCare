# HCL Care - Application Overview

## What is HCL Care?

HCL Care is a **Healthcare Wellness & Preventive Care Portal** built for the HCLTech Hackathon. It's a full-stack web application that helps patients track their health goals and enables healthcare providers to monitor patient compliance with preventive care measures.

## Core Philosophy

The application follows a **"Fortress" Architecture Pattern** - a secure gateway architecture where the frontend never directly accesses the database. All requests flow through a strictly authenticated REST API with JWT tokens and role-based access control (RBAC).

## Key Features

### For Patients
1. **Dashboard**
   - Track daily health metrics (steps, sleep hours)
   - Visual progress bars showing goal achievement
   - Historical data view with status badges
   - Input form to log daily activities

2. **Profile Management**
   - View and edit personal information
   - Manage allergies and medications
   - Update date of birth
   - All changes saved securely to the database

3. **Health Tracking**
   - Set and monitor wellness goals
   - View compliance status
   - Track progress over time

### For Healthcare Providers
1. **Provider Dashboard**
   - View list of assigned patients
   - See patient compliance status at a glance
   - Visual indicators (On Track / Needs Attention)
   - Quick overview of patient health

2. **Patient Details View** ✨ *NEW*
   - Click on any patient to view detailed information
   - See patient profile (allergies, medications, DOB)
   - Review recent activity history
   - Monitor compliance trends

### Security & Authentication
- **JWT-based authentication** for secure sessions
- **Role-based access control** (Patient vs Provider)
- **Password hashing** using bcrypt
- **Mandatory consent checkbox** during registration
- **Protected routes** that redirect unauthorized users

## Technology Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI primitives
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (NoSQL)
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **Middleware:** CORS, dotenv

### Design System
- **Color Palette:** Deep indigo/violet primary with dark mode support
- **Typography:** Outfit (headings) and Inter (body)
- **Effects:** Glassmorphism, gradients, subtle animations
- **Aesthetic:** Premium, modern, state-of-the-art

## Database Schema

### Collections

1. **User**
   - `_id`: MongoDB ObjectId
   - `email`: String (unique)
   - `password`: String (hashed)
   - `role`: "patient" | "provider"
   - `consent_agreed`: Boolean

2. **PatientProfile**
   - `_id`: MongoDB ObjectId
   - `user`: Reference to User
   - `name`: String
   - `dob`: Date
   - `allergies`: Array of Strings
   - `medications`: Array of Strings

3. **DailyMetric**
   - `_id`: MongoDB ObjectId
   - `patient_id`: Reference to User
   - `date`: Date
   - `steps_count`: Number
   - `sleep_hours`: Number
   - `goal_met`: Boolean (computed)

4. **ProviderAssignment**
   - `_id`: MongoDB ObjectId
   - `provider_id`: Reference to User
   - `patient_id`: Reference to User
   - `compliance_status`: "Good" | "Missed"

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate and receive JWT token

### Patient Routes (Protected)
- `GET /api/profile` - Get patient profile
- `POST /api/profile` - Update patient profile
- `GET /api/metrics` - Get patient's daily metrics
- `POST /api/metrics` - Log new daily metric

### Provider Routes (Protected)
- `GET /api/provider/patients` - Get list of assigned patients
- `GET /api/provider/patients/:id` - Get detailed patient information

## Application Flow

### Patient Journey
1. Register/Login → Dashboard
2. View current metrics and history
3. Log daily steps and sleep
4. Update profile information
5. Track progress over time

### Provider Journey
1. Login → Provider Dashboard
2. View list of assigned patients
3. Click on a patient name
4. View detailed patient profile and activity
5. Monitor compliance status

## Data Flow & Security

```
User Request → Frontend (React)
    ↓
JWT Token Validation
    ↓
Express Middleware (protect, role check)
    ↓
Controller Logic
    ↓
MongoDB Query
    ↓
Response with Data
```

## Compliance Engine

The backend calculates compliance automatically:
1. Patient logs daily data (e.g., 3000 steps)
2. Backend compares against goal (e.g., 6000 steps)
3. Backend updates `goal_met` status
4. Provider sees real-time compliance without manual calculation

## Sample Data

The application includes a seeding script that populates:
- 1 Provider account
- 2 Patient accounts (John Doe, Jane Smith)
- Patient profiles with sample allergies/medications
- Provider-patient assignments
- Historical daily metrics (last 7 days)

## What Makes It Special

1. **Premium Design**: Not a basic MVP - features glassmorphism, smooth animations, and a polished UI
2. **Security First**: JWT authentication, password hashing, RBAC from the ground up
3. **Real-time Compliance**: Backend calculates patient compliance automatically
4. **Full CRUD**: Complete Create, Read, Update operations for profiles and metrics
5. **Responsive**: Works seamlessly on desktop and mobile
6. **Clickable Patient List**: Providers can drill down into individual patient details

## Current Status

✅ **Implemented:**
- Authentication system (register/login)
- Patient dashboard with metrics tracking
- Profile management (view/edit)
- Provider dashboard with patient list
- Patient details view (clickable)
- Database seeding script
- Premium UI/UX design
- Role-based access control

❌ **Not Yet Implemented:**
- Deployment to cloud (Vercel/Render)
- CI/CD pipeline (GitHub Actions)
- Public health information page
- Preventive care reminders
- Email notifications

## How to Run

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Setup
1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Create `.env` in backend with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Seed the database: `cd backend && npm run seed`
6. Start backend: `npm start` (runs on port 5000)
7. Start frontend: `cd frontend && npm run dev` (runs on port 5173)
8. Open `http://localhost:5173`

## Future Enhancements

- Deployment to production
- CI/CD automation
- Advanced analytics and charts
- Appointment scheduling
- Medication reminders
- Integration with wearable devices
- Multi-language support
- Dark mode toggle
