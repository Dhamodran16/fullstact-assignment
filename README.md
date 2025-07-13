# Faculty Management System

A full-stack web application for managing departments and faculty members in an educational institution.


<img src="Screenshot 2025-07-13 075821.png" width="1000"/>


## Features

- **Department Management**: Create, read, update, and delete departments
- **Faculty Management**: Manage faculty members with department assignments
- **Form Validation**: Comprehensive client-side validation for all forms
- **Real-time Updates**: Faculty list updates automatically when departments are deleted
- **Responsive Design**: Modern UI with Tailwind CSS
- **TypeScript**: Full TypeScript support for better development experience

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for frontend communication
- **Environment variables** support

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Form validation** with custom validation logic

## Project Structure

```
BetterTech/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   └── seedData.js        # Database seeding script
├── frontend_2/            # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions (validation)
│   │   └── App.tsx        # Main application component
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend_2
npm install
npm run dev
```

### Database Seeding
```bash
cd backend
npm run seed
```

## API Endpoints

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department (and related faculty)

### Faculty
- `GET /api/faculty` - Get all faculty members
- `POST /api/faculty` - Create new faculty member
- `PUT /api/faculty/:id` - Update faculty member
- `DELETE /api/faculty/:id` - Delete faculty member

## Key Features

### Data Integrity
- When a department is deleted, all related faculty members are automatically deleted
- Faculty counts are automatically updated when faculty members are added/removed
- Department name changes automatically update all related faculty records

### Form Validation
- **Department Form**: Name (2-50 chars), Description (10-500 chars)
- **Faculty Form**: Name, Department, Email (valid format), Phone (valid format), Status

### UI/UX
- Responsive design that works on all devices
- Loading states and error handling
- Confirmation dialogs for deletions
- Real-time search functionality
- Faculty members sorted by department

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/faculty_management
PORT=5000
NODE_ENV=development
```

## Development

### Running in Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend_2
npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend_2
npm run build

# Backend
cd backend
npm start
```

## Database Schema

### Department
```javascript
{
  name: String (required),
  description: String (required),
  facultyCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Faculty
```javascript
{
  name: String (required),
  department: String (required),
  email: String (required, unique),
  phone: String (required),
  status: String (enum: ['Active', 'Inactive']),
  createdAt: Date,
  updatedAt: Date
}
