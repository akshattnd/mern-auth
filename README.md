# 🔐 Full-Stack Authentication Service

A production-oriented full-stack authentication system built to understand and implement authentication across both the frontend and backend.

The project includes a **React + TypeScript + Vite frontend** and a **Node.js + Express + TypeScript backend**, with JWT-based access/refresh token authentication.

---

## ✨ Features

### Authentication

- User registration
- User login
- Login using username or email
- Access token authentication
- Refresh token flow
- Logout
- Get current authenticated user
- Protected routes
- Authentication middleware

### Backend

- TypeScript
- Express.js
- JWT authentication
- Zod request validation
- Global error handling
- Centralized API error handling
- Standardized API response structure
- Modular project structure
- Database integration
- Environment-based configuration

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Protected routes
- Authentication-aware UI
- Loading and error states
- Reusable API hooks
- Login and registration forms

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│       React Frontend         │
│      Vite + TypeScript       │
│                              │
│ React Router                 │
│ TanStack Query               │
│ Axios                        │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│       Express Backend        │
│      Node + TypeScript       │
│                              │
│ Routes                       │
│ Controllers                  │
│ Services                     │
│ Validation                   │
│ Auth Middleware              │
│ Global Error Handler         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Database            │
└──────────────────────────────┘
```

---

## 🔄 Authentication Flow

### Login

```text
User
 │
 │ username/email + password
 ▼
React Frontend
 │
 │ POST /auth/login
 ▼
Express API
 │
 ├── Validate request
 ├── Find user
 ├── Verify password
 └── Generate tokens
 │
 ▼
Access Token + Refresh Token
 │
 ▼
Frontend
```

### Protected Request

```text
Frontend
   │
   │ Authorization: Bearer <accessToken>
   ▼
Auth Middleware
   │
   ├── Verify access token
   ├── Extract user information
   └── Attach user to request
   │
   ▼
Protected Controller
   │
   ▼
Response
```

### Token Refresh

```text
Access Token expired
        │
        ▼
Frontend requests refresh
        │
        ▼
POST /auth/refresh
        │
        ▼
Validate Refresh Token
        │
        ▼
Generate new Access Token
        │
        ▼
Retry original request
```

---

## 🧰 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI |
| TypeScript | Type safety |
| Vite | Development/build tooling |
| React Router | Client-side routing |
| TanStack Query | Server-state management |
| Axios | HTTP client |
| Tailwind CSS | UI styling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | HTTP server |
| TypeScript | Type safety |
| JWT | Authentication |
| Zod | Request validation |
| MongoDB / Database | Data persistence |

> Update the database section if your implementation uses a different database.

---

## 📁 Project Structure

```text
auth-service/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── api/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/akshattnd/mern-auth.git

cd auth-service
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## ⚙️ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login with username/email | Public |
| POST | `/api/auth/refresh` | Refresh access token | Refresh token |
| POST | `/api/auth/logout` | Logout user | Protected |
| GET | `/api/auth/me` | Get current user | Protected |

> Update these endpoints to match your actual API routes.

---

## 📦 Example Login Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

The backend can also accept a username:

```json
{
  "username": "akshat",
  "password": "password123"
}
```

---

## 📤 Example API Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "username": "akshat",
      "email": "user@example.com"
    },
    "accessToken": "access-token",
    "refreshToken": "refresh-token"
  }
}
```

> Replace the example response with the exact response structure used by your API.

---

## 🛡️ Security Considerations

This project was designed with several common authentication practices in mind:

- Passwords should never be stored in plain text
- JWT secrets are stored in environment variables
- Protected endpoints use authentication middleware
- Request payloads are validated before reaching business logic
- Authentication errors are handled centrally
- Access and refresh tokens have separate responsibilities
- Sensitive configuration is excluded from source control

For a production deployment, additional protections should be considered, such as:

- Secure, HTTP-only cookies
- CSRF protection when using cookie-based authentication
- Rate limiting
- Account lockout / abuse prevention
- Email verification
- Password reset
- Token/session revocation
- Security headers
- Audit logging
- Monitoring

---

## 🧪 Testing

Add your test commands here once tests are configured.

```bash
npm test
```

Recommended areas to test:

- Registration
- Login
- Invalid credentials
- Duplicate users
- Token refresh
- Logout
- Protected routes
- Invalid/expired tokens
- Request validation
- Global error handling

---

## 🖥️ Screenshots

Add screenshots of the application here.

```text
docs/
├── login.png
├── register.png
├── profile.png
└── architecture.png
```

Example:

### Login

![Login](./docs/login.png)

### Profile

![Profile](./docs/profile.png)

---

## 🗺️ Future Improvements

- [ ] Email verification
- [ ] Forgot/reset password
- [ ] OAuth / Google authentication
- [ ] Role-based access control
- [ ] Rate limiting
- [ ] Redis-based session/token management
- [ ] Automated tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Production deployment

---

## 🎯 What I Learned

This project helped me understand:

- How access and refresh tokens work together
- How protected routes are implemented
- How authentication middleware works
- How frontend and backend authentication state should communicate
- How TanStack Query can manage server state
- How to structure a TypeScript backend
- How to centralize API errors and responses
- How request validation fits into an API architecture
- How to separate authentication logic from controllers and routes

---

## 📌 Project Goals

The main goal of this project was to build authentication from the ground up while following practical software engineering principles instead of treating authentication as only a login/register feature.

The architecture is intentionally modular so additional authentication and authorization features can be added without significantly changing the existing structure.

---

## 👨‍💻 Author

**Akshat Tandon**

Aspiring Full-Stack Engineer

- GitHub: `<your-github-profile>`
- LinkedIn: `<your-linkedin-profile>`

---

## ⭐ If you found this project useful

Give the repository a ⭐ and feel free to open an issue or suggest improvements.
