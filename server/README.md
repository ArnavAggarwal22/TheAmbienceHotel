Admin backend (minimal)

Setup

1. Copy `.env.example` to `.env` and set `ADMIN_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and optional `CLOUDINARY_URL`.
2. Install dependencies and start server:

```bash
cd server
npm install
npm run dev
```

API endpoints

- POST /auth/login  { email, password } -> { token }
- GET /rooms (protected)
- POST /rooms (protected)
- DELETE /rooms/:id (protected)
- POST /upload (multipart form, protected)
- POST /calendar/bulk (protected)

The server persists data under `server/data`.
