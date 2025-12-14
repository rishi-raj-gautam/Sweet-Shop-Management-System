# 🍬 Sweet Shop Management System – Frontend

A modern, responsive frontend for the **Sweet Shop Management System**, built using **React**.  
The application consumes a RESTful backend API to provide authentication, sweet browsing, inventory actions, and admin management features with a clean UI and structured architecture.

---

## 🌐 Live Demo

**[Visit the Live Application](https://sweet-shop-management-system-vert.vercel.app/)**

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Role-aware UI rendering (Admin / User)
- View and search sweets
- Purchase sweets with real-time inventory updates
- Admin functionality:
  - Add new sweets
  - Update sweet details
  - Delete sweets
  - Restock inventory
- Centralized API configuration
- Clean component-based layout
- Responsive and modern UI

---

## 🛠️ Tech Stack

### Frontend
- React (SPA)
- JavaScript (ES6+)
- Vite
- CSS

### State Management
- React Context API

### API Communication
- Fetch API
- Centralized API handler (`apiConfig.js`)

---

## 📁 Project Structure

```
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── apiConfig.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── LandingPage.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── product/
│   │       ├── ProductCard.jsx
│   │       └── ProductModal.jsx
│   │
│   ├── constants/
│   │   └── colors.js
│   │
│   ├── context/
│   │   └── UserContext.jsx
│   │
│   ├── data/
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .env
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone <your-frontend-repository-url>
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE=https://your-backend-url/api
```

For local development:

```env
VITE_API_BASE=http://localhost:5000/api
```

### 4️⃣ Start the development server

```bash
npm run dev
```

Application will run at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

- Users log in or register using email and password
- Backend returns a JWT token
- Token is stored in `localStorage`
- Token is attached automatically to protected API requests
- User role is derived from the JWT payload
- UI adapts based on role (Admin / User)

Authentication utilities are handled in:

```
src/api/apiConfig.js
```

---

## 🔗 API Integration

All API calls are centralized in `apiConfig.js`.

### Example

```js
api.sweets.list();
api.sweets.purchase(sweetId);
api.sweets.restock(sweetId, amount);
```

The API layer handles:

- Base URL configuration
- Authorization headers
- Error handling
- JSON parsing

---

## 🎨 UI Architecture

- **Layout Components**: Header & Footer
- **Page Components**: Dashboard, Login, Register
- **Reusable Components**: ProductCard, ProductModal
- **Context**: Global user state via `UserContext`
- **Constants**: Centralized color definitions

This ensures:

- Separation of concerns
- Reusability
- Easy scalability

---

## 🧪 Testing (Planned)

Frontend testing can be added using:

- Jest
- React Testing Library

Planned coverage:

- Authentication flows
- Component rendering
- API integration mocking
- Role-based UI visibility

---

## 🤖 My AI Usage

AI tools were used responsibly during frontend development.

### Tools Used

- ChatGPT
- Gemini

### How AI Was Used

- UI layout and theme ideation
- Component structuring guidance
- Improving UX flows
- Debugging React and API integration issues

### Reflection

AI accelerated development and design iteration, but all components, logic, and final implementations were manually reviewed and understood before use.

---

## 🌍 Deployment

The frontend is currently deployed on **Vercel** and can be accessed via the live demo link above.

### Deploy Your Own

To deploy the frontend:

- Vercel (Recommended)
- Netlify
- Render (Static Site)

Before deployment:

- Update `.env` with production backend URL
- Build the project using:

```bash
npm run build
```

---

## 📌 Future Improvements

- Add frontend test coverage
- Improve accessibility (ARIA, keyboard navigation)
- Dark mode and theme switching
- Better loading and error states
- Performance optimizations

---

## 👤 Author

**Rishi Raj Gautam**  
Full Stack Developer

---


