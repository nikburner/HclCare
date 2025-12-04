# HCL Care - Login Credentials

## Test Accounts

The following accounts have been seeded in the database for testing purposes.

### Provider Account
- **Email:** `provider@hcl.com`
- **Password:** `password123`
- **Role:** Healthcare Provider
- **Access:** Provider Dashboard, Patient List, Patient Details

### Patient Accounts

#### Patient 1
- **Email:** `patient1@hcl.com`
- **Password:** `password123`
- **Role:** Patient
- **Name:** John Doe
- **Access:** Patient Dashboard, Profile Management

#### Patient 2
- **Email:** `patient2@hcl.com`
- **Password:** `password123`
- **Role:** Patient
- **Name:** Jane Smith
- **Access:** Patient Dashboard, Profile Management

## How to Use

1. Start the backend server: `cd backend && npm start`
2. Start the frontend server: `cd frontend && npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "Get Started" or go to `/login`
5. Use any of the credentials above to log in

## Resetting Data

To reset the database with fresh sample data, run:
```bash
cd backend
npm run seed
```

This will clear existing data and repopulate with the accounts listed above.
