# 🚀 Express Backend Starter

A production-ready backend boilerplate built with Node.js, Express, MongoDB, JWT authentication, and modular architecture.

Designed for SaaS applications, dashboards, and scalable APIs.

## 💡 Why this project?

This starter helps developers ship scalable SaaS backends faster by removing the need to rebuild authentication, authorization, and core architecture in every project.

## ✨ Features

- 🔐 JWT Authentication (Access + Refresh Tokens)
- 👥 Role-Based Access Control (RBAC)
- 🧠 Modular architecture
- 📦 Session management
- 🔁 Refresh token system
- 🚪 Logout / Logout all devices
- 🔒 Password reset flow
- 📧 Email verification system
- 📊 Pagination & filtering (in progress)
- 📘 Swagger API documentation
- ⚡ Clean error handling

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Swagger (OpenAPI)

## 📁 Project Structure

src/
 ├── common/
 ├── config/
 ├── middlewares/
 ├── modules/
 ├── routes/
 ├── seed/
 ├── utils/
 ├── app.js
 └── server.js

## 🚀 Installation

```bash
git clone https://github.com/your-repo/express-backend-starter.git
cd express-backend-starter
npm install
npm run dev
```

## ⚙️ Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bd
NODE_ENV=development
JWT_SECRET=super_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
ADMIN_NAME=adminName
ADMIN_EMAIL=adminEmail
ADMIN_PASSWORD=adminPassword
CLIENT_URL=http://localhost:your-frontend-port
```

## 🌱 Seed admin (recommended for development)

``npm run seed:admin``

## 📘 API Documentation

Swagger available at:

``http://localhost:5000/api-docs``

### Example API Request

#### Register

POST /api/auth/register

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Open a pull request

## 📄 License

MIT
