import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/common/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { clearAuthToken, clearStoredEmail, getAuthToken, getStoredEmail, parseJwt } from './api/apiConfig';
import { UserContext } from './context/UserContext';

function App() {
  const [user, setUser] = useState(() => {
    const token = getAuthToken();
    const email = getStoredEmail();
    if (!token || !email) return null;
    const payload = parseJwt(token);
    if (!payload) return null;
    return {
      email,
      role: payload.role,
      isAdmin: payload.role === 'admin',
      token
    };
  });

  const handleLogout = () => {
    clearAuthToken();
    clearStoredEmail();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterPage />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
