# Frontend Implementation Plan

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS + Shadcn UI
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Context (AuthContext)

## Pages & Routes

### 1. Landing Page (`/`)
- **Access:** Public
- **Content:**
    - Hero section with "Login" and "Register" buttons.
    - Public health information (Static).
- **API Calls:** None.

### 2. Login Page (`/login`)
- **Access:** Public
- **Form:** Email, Password.
- **API Call:**
    - **Request:** `POST /api/auth/login`
    - **Body:** `{ email, password }`
    - **Response:** `{ token, role, ... }`
- **Action:** Store token in localStorage, redirect to Dashboard based on role.

### 3. Register Page (`/register`)
- **Access:** Public
- **Form:** Email, Password, Role (Patient/Provider), Consent Checkbox.
- **API Call:**
    - **Request:** `POST /api/auth/register`
    - **Body:** `{ email, password, role, consent_agreed }`
    - **Response:** `{ token, role, ... }`
- **Action:** Store token, redirect to Dashboard.

### 4. Patient Dashboard (`/dashboard`)
- **Access:** Private (Patient)
- **Content:**
    - Welcome message.
    - **Metrics Form:** Input steps and sleep hours.
    - **Metrics History:** List of past logs with "Goal Met" status.
- **API Calls:**
    - **Log Metrics:**
        - **Request:** `POST /api/metrics`
        - **Body:** `{ steps_count, sleep_hours }`
    - **Get Metrics:**
        - **Request:** `GET /api/metrics`
        - **Response:** `[{ date, steps_count, sleep_hours, goal_met }, ...]`

### 5. Patient Profile (`/profile`)
- **Access:** Private (Patient)
- **Content:**
    - Form to view/edit Name, DOB, Allergies, Medications.
- **API Calls:**
    - **Get Profile:**
        - **Request:** `GET /api/profile`
        - **Response:** `{ name, dob, allergies, medications }`
    - **Update Profile:**
        - **Request:** `POST /api/profile`
        - **Body:** `{ name, dob, allergies, medications }`

### 6. Provider Dashboard (`/provider`)
- **Access:** Private (Provider)
- **Content:**
    - Table of assigned patients.
    - Compliance status (Green/Red).
- **API Calls:**
    - **Get Patients:**
        - **Request:** `GET /api/provider/patients`
        - **Response:** `[{ name, email, ... }, ...]`

## Components
- **Navbar:** Navigation links based on auth state and role.
- **ProtectedRoute:** Wrapper to check for token and role.
- **Layout:** Main layout structure.

## Directory Structure
```
src/
├── components/
│   ├── ui/          # Shadcn components
│   ├── Navbar.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   └── ProviderDashboard.jsx
├── services/
│   └── api.js       # Axios instance
└── App.jsx
```
