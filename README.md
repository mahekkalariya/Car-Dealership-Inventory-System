                                     Car Dealership Inventory System

A full-stack web application for managing vehicle inventory in a car dealership. The system allows authenticated users to browse available vehicles, search and filter inventory, purchase vehicles, and track stock quantities. Administrators have additional privileges to manage the dealership inventory by adding, updating, deleting, and restocking vehicles.

 
                                     Project Overview
The Car Dealership Inventory System provides a centralized platform for managing vehicle inventory and dealership operations.

>> The application provides:

      :User registration and login
      :JWT-based authentication
      :Role-based authorization
      :Vehicle inventory management
      :Vehicle search and filtering
      :Vehicle purchasing
      :Stock restocking
      :Admin-only vehicle management
      :Automated backend testing using Test-Driven Development

>> The project was developed using a TDD workflow following the:
Red → Green → Refactor  development cycle.

                                       ✨ Features

👤 Authentication

        :User registration
        :User login
        :Password hashing
        :JWT-based authentication
        :Protected API routes

🚘 Vehicle Management

        :Add new vehicles
        :View available vehicles
        :Search vehicles by:
              -Make
              -Model
              -Category
              -Price range
        :Update vehicle details
        :Delete vehicles

📦 Inventory Management
        :Purchase vehicles
        :Automatically decrease stock after purchase
        :Prevent purchases when stock is zero
        :Restock vehicles
        :Prevent negative inventory quantities

🛡️ Role-Based Access Control
        :Regular User
        :Register
        :Login
        :View vehicles
        :Search vehicles
        :Purchase vehicles
        :Admin
        :All regular user permissions
        :Add vehicles
        :Update vehicles
        :Delete vehicles
        :Restock vehicles

🛠️ Tech Stack
     ~Backend
        :Node.js
        :Express.js
        :MongoDB
        :Mongoose
        :JSON Web Token (JWT)
        :bcrypt

      ~Frontend
        :React
        :Vite
        :Tailwind CSS
        :Axios
        :React Router

      ~Testing
        :Jest
        :Supertest

      ~Development Tools
        :Git
        :GitHub
        :Postman / Thunder Client
        :ESLint
        :Prettier


                                       Project Architecture

Car-delivery-inventory-system/
|
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── tests/
|
└── frontend/
|  └── src/
|  ├── api/
|  ├── context/
|  ├── components/
|  └── pages/
|
├── screenshots/
├── PROMPTS.md 
├── README.md 
└── .gitignore  

## Setup — backend

```bash
cd backend
npm install
cp .env.example .env   
npm run dev             # http://localhost:5000
```

Your `MONGO_URI` must include an explicit database name, e.g.:

## Setup — frontend

```bash
cd frontend
npm install
cp .env.example .env   # defaults to http://localhost:5000/api
npm run dev             # http://localhost:5174 (or next available port)
```

## Running tests

```bash
cd backend
npm test
```

Tests run against an isolated in-memory MongoDB instance
(`mongodb-memory-server`) — they never touch your real Atlas database.

## API reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create an account (role: user or admin) |
| POST | `/api/auth/login` | — | Log in, returns a JWT |
| GET | `/api/vehicles` | user | List all vehicles |
| GET | `/api/vehicles/search` | user | Filter by make, model, category, price range |
| POST | `/api/vehicles` | user | Add a vehicle |
| PUT | `/api/vehicles/:id` | user | Update a vehicle |
| DELETE | `/api/vehicles/:id` | admin | Delete a vehicle |
| POST | `/api/vehicles/:id/purchase` | user | Purchase (quantity -1) |
| POST | `/api/vehicles/:id/restock` | admin | Restock (quantity +N) |

## Live demo

_Add your deployed frontend/backend links here once deployed._

## Screenshots

_Add screenshots here — dashboard (user view), dashboard (admin view
with add/edit/restock/delete), login, register, and a purchase in
action._

## My AI usage

- **Which AI tools I used:** 


See `PROMPTS.md` for the full session-by-session history.



