# ClinicFlow Backend 🏥

Backend API for a clinic management system built with Node.js, Express and PostgreSQL.

## 📌 Description

ClinicFlow is a REST API that helps manage clinic operations:

- User authentication
- Patient management
- Appointment management
- Dashboard statistics

The project follows a modular architecture with separated layers:

- Routes
- Controllers
- Services
- Repositories
- Middlewares

---

## 🚀 Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Zod Validation
- bcrypt
- SQL Migrations

---

## ✨ Features

### Authentication

- Login with email and password
- Password hashing with bcrypt
- JWT token generation
- Role-based authorization

### Patients Management

- Create patient
- Get all patients
- Get patient by ID
- Update patient information
- Soft delete patient

### Appointments Management

- Create appointment
- List appointments
- Get appointment details
- Update appointment
- Cancel appointment

### Business Rules

- Prevent conflicting confirmed appointments for the same patient within 30 minutes

### Dashboard

- Total number of patients
- Today's appointments
- Appointment status statistics

---

## 📂 Project Structure

```
src
│
├── config
│
├── middlewares
│
├── modules
│   │
│   ├── auth
│   ├── patients
│   ├── appointments
│   └── dashboard
│
└── app.js
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/ouma-cmd/clinicflow.git
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key
```

Start the server:

Development:

```bash
npm run dev
```

---

## 🔐 Authentication

Protected routes require JWT:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 📌 API Endpoints

### Auth

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/auth/login | Login user  |

---

### Patients

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| POST   | /api/patients     | Create patient |
| GET    | /api/patients     | Get patients   |
| GET    | /api/patients/:id | Get patient    |
| PUT    | /api/patients/:id | Update patient |
| DELETE | /api/patients/:id | Delete patient |

---

### Appointments

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| POST   | /api/appointments            | Create appointment |
| GET    | /api/appointments            | Get appointments   |
| GET    | /api/appointments/:id        | Get appointment    |
| PUT    | /api/appointments/:id        | Update appointment |
| PATCH  | /api/appointments/:id/cancel | Cancel appointment |

---

### Dashboard

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | /api/dashboard | Dashboard statistics |

---

## 👩‍💻 Author

Oumaima Oueldelalia

Full Stack JavaScript Developer

---

## 📄 License

This project is for learning and professional portfolio purposes.
