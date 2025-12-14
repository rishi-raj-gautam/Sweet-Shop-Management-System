# 🍬 Sweet Shop Management System – Backend

A RESTful backend API for managing a sweet shop, built with Node.js, Express, and MongoDB. Features include JWT-based authentication, role-based access control, inventory management, and comprehensive test coverage using Jest.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Testing-Jest-red.svg)](https://jestjs.io/)

## 🚀 Features

- ✅ User registration & login with JWT-based authentication
- ✅ Role-based access control (Admin / User)
- ✅ Complete CRUD operations for sweets
- ✅ Inventory management (purchase & restock)
- ✅ Advanced search (by name, category, and price range)
- ✅ Centralized error handling
- ✅ Comprehensive test coverage using Jest & Supertest
- ✅ Deployed on Render with CI/CD

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM

### Authentication & Security
- **JWT** (JSON Web Tokens) for secure authentication
- **bcrypt** for password hashing

### Testing
- **Jest** - Test framework and assertion library
- **Supertest** - HTTP API testing
- **mongodb-memory-server** - In-memory database for isolated testing

### Deployment
- **Render** - Cloud platform with auto-deployment

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   ├── controllers/            # Business logic
│   ├── routes/                 # API routes
│   ├── models/                 # Mongoose schemas
│   ├── middleware/             # Auth & error handling
│   └── utils/                  # Helper functions
│
├── tests/
│   ├── setup.js                # Test configuration
│   ├── auth.test.js            # Authentication tests
│   └── sweets.test.js          # Sweet operations tests
│
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=supersecretkey
NODE_ENV=development
```

### 4️⃣ Run the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will be available at: `http://localhost:5000`

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login existing user | Public |

**Sample Registration Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user"
}
```

### Sweets Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/sweets` | Create new sweet | Admin |
| `GET` | `/api/sweets` | Get all sweets | User |
| `GET` | `/api/sweets/search` | Search sweets | User |
| `GET` | `/api/sweets/:id` | Get sweet by ID | User |
| `PUT` | `/api/sweets/:id` | Update sweet | Admin |
| `DELETE` | `/api/sweets/:id` | Delete sweet | Admin |

**Sample Sweet Object:**
```json
{
  "name": "Gulab Jamun",
  "category": "Traditional",
  "price": 250,
  "stock": 50,
  "description": "Soft milk-solid-based sweet soaked in sugar syrup"
}
```

### Inventory Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/sweets/:id/purchase` | Purchase sweets | User |
| `POST` | `/api/sweets/:id/restock` | Restock inventory | Admin |

**Sample Purchase Request:**
```json
{
  "quantity": 5
}
```

**Sample Restock Request:**
```json
{
  "quantity": 20
}
```

## 🧪 Testing

### Tools Used
- **Jest** – Test runner & assertion library
- **Supertest** – HTTP API testing
- **mongodb-memory-server** – In-memory MongoDB for isolated tests

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- ✅ User registration & authentication
- ✅ Role-based access control (admin vs user)
- ✅ Sweet CRUD operations
- ✅ Inventory management edge cases
- ✅ Search functionality
- ✅ Error handling scenarios

## 🔴🟢♻️ Test-Driven Development (TDD)

This project follows **Test-Driven Development** practices:

1. **Red** – Write a failing test
2. **Green** – Implement minimal logic to pass the test
3. **Refactor** – Clean up code while keeping tests green

### TDD Approach
After stabilizing the backend and validating APIs manually using Postman, TDD was applied for:
- New features
- Edge cases
- Refactoring existing code

**Characterization tests** were added to lock existing behavior before making changes, reflecting real-world TDD practices on legacy systems.

The Red-Green-Refactor cycle is visible in the Git commit history.

## 🤖 AI Usage Disclosure

AI tools were used responsibly during development to accelerate learning and problem-solving.

### Tools Used
- ChatGPT

### How AI Was Used
- Debugging Jest and test environment setup
- Structuring Jest & Supertest test cases
- Understanding TDD application on existing backends
- Improving error handling patterns
- Code review and best practices

### Reflection
AI significantly accelerated problem-solving and helped clarify best practices. However, all logic, decisions, and final implementations were manually reviewed and understood before being committed. All AI-assisted commits include proper AI co-authorship as required.

## 🌍 Deployment

The backend is deployed on **Render**.

### Deployment Features
- ✅ Auto-deploys on push to `main` branch
- ✅ Uses production MongoDB instance
- ✅ Environment variables securely configured
- ✅ HTTPS enabled

### Live API
```
https://sweet-shop-management-system-n2na.onrender.com
```

### Local Testing Before Deployment
```bash
# Set NODE_ENV to production
NODE_ENV=production npm start
```

## 📊 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/sweetshop` |
| `JWT_SECRET` | Secret key for JWT signing | `supersecretkey` |
| `NODE_ENV` | Environment mode | `development` / `production` |

## 🔒 Security Best Practices

- ✅ Passwords hashed using bcrypt
- ✅ JWT tokens for stateless authentication
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ Role-based access control
- ✅ Error messages don't expose sensitive information

## 📌 Future Improvements

- [ ] API documentation using Swagger/OpenAPI
- [ ] Refresh token implementation
- [ ] Rate limiting & security hardening
- [ ] Pagination for sweets listing
- [ ] CI/CD pipeline with automated testing
- [ ] Image upload for sweets
- [ ] Order management system
- [ ] Sales analytics and reporting
- [ ] Email notifications
- [ ] Redis caching layer

## 🐛 Known Issues

No major issues at the moment. Please report bugs via the Issues tab.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Rishi Raj Gautam**

- GitHub: [@rishi-raj-gautam](https://github.com/rishi-raj-gautam/)
- LinkedIn: [Rishi Raj Gautam](https://www.linkedin.com/in/rishi-raj-gautam-232221276/)
- Email: rishirajgautam.030303@gmail.com

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB University
- Jest documentation
- Test-Driven Development community
- Render deployment platform

---

⭐ If you find this project helpful, please consider giving it a star!

**Built with ❤️ using Node.js, Express, and MongoDB**
