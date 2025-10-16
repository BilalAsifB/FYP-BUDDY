# FYP BUDDY

A platform designed to help students find team members and supervisors for their Final Year Projects (FYP).

## Overview

FYP BUDDY streamlines the process of forming project teams and connecting with academic supervisors. Students can search for compatible team members based on skills, interests, and preferences, while supervisors can discover and mentor promising project teams.

## Features

- **Student Team Formation**: Search and connect with compatible students
- **Supervisor Matching**: Find and request supervisors or co-supervisors
- **Profile Management**: Complete and maintain detailed student/supervisor profiles
- **Real-time Messaging**: Chat with team members and supervisors
- **Compatibility Matching**: AI-powered matching algorithm for optimal team composition
- **Search Requests**: Create and manage search requests for team members and supervisors

## Database Schema (ERD)

![FYP BUDDY Database ERD](https://app.eraser.io/workspace/pDkDGiGTN9ARU1Fd03n7?origin=share)

For detailed ERD visualization, visit: [Eraser - FYP BUDDY ERD](https://app.eraser.io/workspace/pDkDGiGTN9ARU1Fd03n7?origin=share)

### Core Entities

| Entity | Purpose |
|--------|---------|
| **User** | Base user model for authentication (Student/Supervisor) |
| **Student** | Student profile with skills, interests, and project details |
| **Supervisor** | Supervisor profile with domains and interests |
| **Team** | Project team with members and supervisor assignments |

### Search & Matching

| Entity | Purpose |
|--------|---------|
| **StudentSearchRequest** | Search criteria for finding team members |
| **StudentMatchResult** | Compatibility scores for student matches |
| **SupervisorSearchRequest** | Search criteria for finding supervisors |
| **SupervisorMatchResult** | Compatibility scores for supervisor matches |

### Connections & Confirmations

| Entity | Purpose |
|--------|---------|
| **StudentConnection** | Connection requests between students |
| **TeamSupervisorConnection** | Connection requests between teams and supervisors |
| **ConfirmedTeamMember** | Confirmed team membership records |
| **ConfirmedTeamSupervisor** | Confirmed supervisor assignments |

### Messaging

| Entity | Purpose |
|--------|---------|
| **StudentChatRoom** | Chat room for student-to-student communication |
| **TeamSupervisorChatRoom** | Chat room for team-to-supervisor communication |
| **Message** | Individual messages in chat rooms |

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt (password hashing), express-rate-limit
- **Other**: CORS, cookie-parser

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/refresh-token` - Refresh access token

### Student Profiles
- `POST /api/v1/profiles/student` - Create student profile
- `GET /api/v1/profiles/student` - Get own student profile
- `PATCH /api/v1/profiles/student` - Update student profile

### Supervisor Profiles
- `POST /api/v1/profiles/supervisor` - Create supervisor profile
- `GET /api/v1/profiles/supervisor` - Get own supervisor profile
- `PATCH /api/v1/profiles/supervisor` - Update supervisor profile

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fyp-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=8000
MONGODB_URI=<your_mongodb_uri>
CORS_ORIGIN=<your_frontend_url>
ACCESS_TOKEN_SECRET=<your_secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your_secret>
REFRESH_TOKEN_EXPIRY=10d
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:8000`

## Project Structure

```
fyp-buddy/
├── src/
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utility functions
│   ├── database/            # Database connection
│   ├── app.js               # Express app setup
│   ├── index.js             # Server entry point
│   └── constants.js         # Application constants
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── .prettierrc               # Prettier configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## Security Features

- Email validation (@nu.edu.pk domain required)
- Strong password requirements (8+ chars, uppercase, number, special char)
- Rate limiting on registration and login endpoints
- JWT-based authentication
- httpOnly cookies for token storage
- CORS protection
- Authorization middleware for profile access

## Contributing

This project is part of the FYP BUDDY initiative. For contributions, please follow the existing code style and create pull requests with clear descriptions.

## Author

Bilal Asif Burney

## License

ISC