# Auth Service

A production-oriented authentication service built with Node.js,
Express, TypeScript and MongoDB.

## Features

- User registration
- Login with username/email
- Access & refresh token authentication
- Logout
- Protected routes
- Request validation with Zod
- Global error handling
- Standardized API responses
- Authentication middleware

## Architecture

Client
   ↓
Express API
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repository / Database

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Zod

## API Endpoints

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me

## Getting Started

...

## Environment Variables

...

## API Documentation

...

## Future Improvements

- OAuth
- Email verification
- Password reset
- Rate limiting
- Redis-based token/session management