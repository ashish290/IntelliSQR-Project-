# IntelliSQR-Project-

# Full Stack Web Application

## 📌 Overview

This is a full-stack web application built with **React (frontend)** and **Express with Prisma & PostgreSQL (backend)**. The project includes authentication (login/signup), API communication using `react-query`, and form validation with `react-hook-form` and `zod`.

## 🚀 Tech Stack

### Frontend:
- **React (JSX)**
- **TypeScript**
- **React Hook Form** (for form handling)
- **Zod** (for schema validation)
- **React Router** (for navigation)
- **React Query** (for API requests)
- **CSS** (for styling)

### Backend:
- **Node.js & Express** (Server-side framework)
- **Prisma** (ORM for PostgreSQL)
- **PostgreSQL** (Database)
- **jsonwebtoken** (for authentication)
- **bcryptjs** (for password hashing)

---

## 📂 Folder Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models (Prisma)
│   │   ├── services/        # Utility functions
│   │   ├── index.ts         # Server entry point
│   │   ├── prisma/          # Prisma schema & migrations
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── prisma/schema.prisma # Prisma Schema
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Login, Signup, Dashboard, etc.
│   │   ├── styles/          # CSS files
│   │   ├── App.tsx          # Main App component
│   │   ├── main.tsx         # React entry file
│   │   ├── assets/          # Images, icons, etc.
│   ├── .env                 # Frontend environment variables
│   ├── package.json         # Frontend dependencies
│   ├── tsconfig.json        # TypeScript config
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-repo/fullstack-app.git
cd fullstack-app
```

### 2️⃣ Install dependencies
#### Backend:
```sh
cd backend
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Set up environment variables
#### Backend `.env`:
```sh
PORT=5000
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your_secret_key"
```
#### Frontend `.env`:
```sh
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Run the development server
#### Backend:
```sh
npm run dev
```
#### Frontend:
```sh
npm run dev
```
The app should now be running at:
- **Frontend:** `http://localhost:5173/`
- **Backend:** `http://localhost:5000/`

---

## 📜 Features
- 🔒 **Authentication**: Login & Signup with JWT authentication
- ⚡ **Prisma ORM**: PostgreSQL integration
- 🔄 **React Query**: API data fetching & caching
- ✅ **Validation**: `react-hook-form` & `zod`
- 🎨 **Responsive UI**: Styled with CSS
- 🏎️ **Optimized Performance**

---

## 📜 API Endpoints
### 🔹 User Authentication
- **`POST /api/auth/signup`** → Register a new user
- **`POST /api/auth/login`** → Login user
- **`GET /api/auth/me`** → Get current user

