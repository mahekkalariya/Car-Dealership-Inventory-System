# Car Dealership Inventory System

A full-stack web application for managing vehicle inventory in a car dealership. The system allows authenticated users to browse available vehicles, search and filter inventory, purchase vehicles, and track stock quantities. Administrators have additional privileges to manage the dealership inventory by adding, updating, deleting, and restocking vehicles.

---

## Project Overview

The Car Dealership Inventory System provides a centralized platform for managing vehicle inventory and dealership operations.

### The application provides:

* User registration and login
* JWT-based authentication
* Role-based authorization
* Vehicle inventory management
* Vehicle search and filtering
* Vehicle purchasing
* Stock restocking
* Admin-only vehicle management
* Automated backend testing using Test-Driven Development

The project was developed using a TDD workflow following the:

> **Red → Green → Refactor** development cycle.

---

# ✨ Features

## 👤 Authentication

* User registration
* User login
* Password hashing
* JWT-based authentication
* Protected API routes

---

## 🚘 Vehicle Management

* Add new vehicles
* View available vehicles
* Search vehicles by:

  * Make
  * Model
  * Category
  * Price range
* Update vehicle details
* Delete vehicles

---

## 📦 Inventory Management

* Purchase vehicles
* Automatically decrease stock after purchase
* Prevent purchases when stock is zero
* Restock vehicles
* Prevent negative inventory quantities

---

## 🛡️ Role-Based Access Control

### Regular User

* Register
* Login
* View vehicles
* Search vehicles
* Purchase vehicles

### Admin

* All regular user permissions
* Add vehicles
* Update vehicles
* Delete vehicles
* Restock vehicles

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

## Testing

* Jest
* Supertest

## Development Tools

* Git
* GitHub
* Postman / Thunder Client
* ESLint
* Prettier

---

# Project Architecture

```text
Car-Dealership-Inventory-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── tests/
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── context/
│       ├── components/
│       └── pages/
│
├── screenshots/
├── PROMPTS.md
├── README.md
└── .gitignore
```

---

# Setup — Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

Your `MONGO_URI` must include an explicit database name, for example:

```text
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
```

---

# Setup — Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend defaults to:

```text
http://localhost:5174
```

or the next available port.

---

# Running Tests

```bash
cd backend
npm test
```

Tests run against an isolated in-memory MongoDB instance (`mongodb-memory-server`) — they never touch your real Atlas database.

---

# API Reference

| Method | Endpoint                     | Auth  | Description                                  |
| ------ | ---------------------------- | ----- | -------------------------------------------- |
| POST   | `/api/auth/register`         | —     | Create an account (role: user or admin)      |
| POST   | `/api/auth/login`            | —     | Log in, returns a JWT                        |
| GET    | `/api/vehicles`              | user  | List all vehicles                            |
| GET    | `/api/vehicles/search`       | user  | Filter by make, model, category, price range |
| POST   | `/api/vehicles`              | user  | Add a vehicle                                |
| PUT    | `/api/vehicles/:id`          | user  | Update a vehicle                             |
| DELETE | `/api/vehicles/:id`          | admin | Delete a vehicle                             |
| POST   | `/api/vehicles/:id/purchase` | user  | Purchase (quantity -1)                       |
| POST   | `/api/vehicles/:id/restock`  | admin | Restock (quantity +N)                        |

---
# Live Demo

//vercel link direct web

https://car-dealership-inventory-system-seven.vercel.app/

//backend

https://car-dealership-inventory-system-b1uo.onrender.com/api/health
---


# Screenshots

## Login
Screenshots\Login.png

## Registration
Screenshots\Registration.png

## UserDashboard
Screenshots\UserDashboard.png

## NewVehicleAdd
Screenshots\NewVehicleAdd.png

## Filter
Screenshots\Filter.png

## AdminDashboard
Screenshots\Admin Dashboard.png

## AddVehicle
Screenshots\AddVehicle.png


---

# My AI Usage

* **Which AI tools I used:**

See [`PROMPTS.md`](PROMPTS.md) for the full session-by-session history.



