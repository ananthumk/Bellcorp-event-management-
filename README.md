Bellcorp Event Management Application

Bellcorp Event Management Application is a full-stack web application that allows users to register, explore events, and manage their event participation through a secure authentication system.

Live Application

Frontend (Vercel):
https://bellcorp-event-management-xgzz.vercel.app/

Backend (Render):
https://bellcorp-event-management-den5.onrender.com

Local Backend Base URL:
http://localhost:5000/api/

Tech Stack
Backend

Node.js

Express.js

MongoDB with Mongoose

bcryptjs (password hashing)

jsonwebtoken (JWT authentication)

validator (email validation)

cors

dotenv

Frontend

Vite

React

React Router DOM

Axios

Lucide React

Tailwind CSS (responsive design)

Features

User registration and login

JWT-based authentication

Protected routes using middleware

Search events by name

Filter events by category and location

Pagination support

Register for events

Dashboard displaying upcoming and past events

Logout functionality

Fully responsive UI

Backend API Documentation

Base URL (Local):
http://localhost:5000/api/

Base URL (Production):
https://bellcorp-event-management-den5.onrender.com

Authentication Routes

Register User
POST /api/auth/register

Request Body:
{
"name": "Kumar",
"email": "kumar@example.com
",
"password": "123456"
}

Login User
POST /api/auth/login

Request Body:
{
"email": "kumar@example.com
",
"password": "123456"
}

Event Routes

Get All Events
GET /api/event/

Query Parameters:

search (optional)

category (optional)

location (optional)

page (optional)

Example:
GET /api/event?search=music&category=concert&location=mumbai&page=1

Registration Routes

Register for Event
POST /api/registration/register/:eventId

Headers:
Authorization: Bearer <token>

Get Registered Events
GET /api/registration/

Headers:
Authorization: Bearer <token>

Authentication Middleware

The backend uses a JWT authentication middleware that:

Verifies the token from the Authorization header

Decodes the user ID

Protects private routes such as event registration and dashboard

Database Seeding

To seed initial event data:

Ensure MongoDB is running

Configure the .env file

Run:

node seeder.js

This will insert predefined event data into the database.

Environment Variables

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Installation and Setup
Clone Repository

git clone <repository-url>

Backend Setup

cd server
npm install
npm run dev

Backend runs on:
http://localhost:5000

Frontend Setup

cd client
npm install
npm run dev

Project Structure

Backend

server/

config/
    db.js
controllers/
     event.contoller.js
     registration.controller.js
     user.controller.js

middleware/
     authMiddleware.js

models/
    Event.models.js
    User.model.js
    registration.model.js

routes/
    EventRoutes.js
    authRoutes.js
    registrationRoutes.js
seeder.js

server.js

Frontend

src/

components/
    eventCard.jsx
    EventPopup.jsx
    Navbar.jsx
    ProtectedRoute.jsx
context/
    AppContext.jsx
pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
App.jsx

main.jsx

Security Implementation

Password hashing using bcryptjs

JWT token authentication

Email validation using validator

Protected API endpoints

