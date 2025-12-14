import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Package, CheckCircle2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../constants/colors';
import { UserContext } from '../context/UserContext';
import { api, parseJwt, setAuthToken, setStoredEmail } from '../api/apiConfig';

function RegisterPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirm) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (validateForm()) {
      setSubmitting(true);
      try {
        const data = await api.auth.register(name, email, password);
        const token = data?.token;
        if (!token) throw new Error('Registration succeeded but token was not returned');

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
        setApiError(err?.message || 'Registration failed');
      } finally {
        setSubmitting(false);
      }
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Sweet Shop and start managing your inventory</p>
        </div>

        {/* Register Card */}
        <Motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {apiError && (
              <Motion.div
                className="p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {apiError}
              </Motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Enter your name"
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="Create a password"
                  required
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.confirm ? 'border-red-300 focus:border-red-500 focus:ring-red-200' :
                    password && password === confirm ? 'border-green-300 focus:border-green-500 focus:ring-green-200' :
                    'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (errors.confirm) setErrors({ ...errors, confirm: '' });
                  }}
                  placeholder="Confirm your password"
                  required
                />
                {password && password === confirm && !errors.confirm && (
                  <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                )}
              </div>
              {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
            </div>

            <Motion.button
              type="submit"
              disabled={submitting}
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
              className="w-full py-3.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={submitting ? undefined : { y: -2 }}
              whileTap={submitting ? undefined : { scale: 0.98 }}
            >
              <UserPlus size={20} />
              <span>{submitting ? 'Creating...' : 'Create Account'}</span>
            </Motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-semibold hover:underline transition-all"
              style={{ color: colors.primary }}
            >
              Sign In
            </button>
          </p>
        </Motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
