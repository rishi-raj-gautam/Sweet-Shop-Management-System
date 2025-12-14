import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Package, Sparkles } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../constants/colors';
import { UserContext } from '../context/UserContext';
import { api, parseJwt, setAuthToken, setStoredEmail } from '../api/apiConfig';

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) return;
    setSubmitting(true);
    try {
      const data = await api.auth.login(email, password);
      const token = data?.token;
      if (!token) throw new Error('Login succeeded but token was not returned');

      setAuthToken(token);
      setStoredEmail(email);

      const payload = parseJwt(token);
      setUser({
        email,
        role: payload?.role,
        isAdmin: payload?.role === 'admin',
        token
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminLogin = () => {
    setEmail('admin@sweetshop.com');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `radial-gradient(900px 500px at 20% 0%, ${colors.tertiary}55 0%, transparent 55%), radial-gradient(900px 500px at 80% 10%, ${colors.secondary}33 0%, transparent 55%), linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent} 60%)`
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            <Package className="text-white" size={32} />
          </Motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Sweet Shop account</p>
        </div>

        {/* Login Card */}
        <Motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Motion.div
                className="p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </Motion.div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Motion.button
              type="submit"
              disabled={submitting}
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
              className="w-full py-3.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={submitting ? undefined : { y: -2 }}
              whileTap={submitting ? undefined : { scale: 0.98 }}
            >
              <LogIn size={20} />
              <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
            </Motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Quick Access</span>
              </div>
            </div>
            <Motion.button
              onClick={handleAdminLogin}
              className="w-full mt-4 py-3 border-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              style={{ borderColor: colors.secondary }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={18} />
              <span>Demo Admin Login</span>
            </Motion.button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleRegister}
              className="font-semibold hover:underline transition-all"
              style={{ color: colors.primary }}
            >
              Create Account
            </button>
          </p>
        </Motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
