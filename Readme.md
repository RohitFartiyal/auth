# Full Stack Login/Signup App

A complete authentication system built with:

- **Frontend:** React + TypeScript + Tailwind CSS + React Hook Form + Zod + React Query
- **Backend:** Node.js + Express + Prisma + PostgreSQL + JWT + bcrypt

##  Features

- User registration and login
- Form validation with Zod
- Token-based authentication with JWT
- Secure password hashing with bcrypt
- Protected API routes
- Tailwind CSS styling

##  Getting Started

### 1. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
