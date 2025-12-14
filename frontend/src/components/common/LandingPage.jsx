import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, Search, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../../constants/colors';

function LandingPage() {
  const navigate = useNavigate();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const features = [
    {
      title: 'Inventory Management',
      description: 'Track and manage your sweet shop inventory in real-time with ease. Get instant updates on stock levels and product availability.',
      icon: Package,
      color: colors.primary
    },
    {
      title: 'User Authentication',
      description: 'Secure login system with role-based access for admins and customers. Keep your data safe with enterprise-grade security.',
      icon: Shield,
      color: colors.secondary
    },
    {
      title: 'Smart Search',
      description: 'Quickly find products by name, category, or price range. Advanced filtering makes inventory management effortless.',
      icon: Search,
      color: colors.tertiary
    },
    {
      title: 'Fast Performance',
      description: 'Lightning-fast interface with smooth animations. Manage your inventory without any lag or delays.',
      icon: Zap,
      color: colors.primary
    },
    {
      title: 'Easy Management',
      description: 'Add, edit, and delete products with just a few clicks. Restock inventory with a single action.',
      icon: User,
      color: colors.secondary
    }
  ];

  const stats = [
    { value: '500+', label: 'Products Managed', icon: Package },
    { value: '1000+', label: 'Happy Customers', icon: User },
    { value: '24/7', label: 'Support Available', icon: Shield }
  ];

  const benefits = [
    'Real-time inventory tracking',
    'Role-based access control',
    'Beautiful, modern interface',
    'Mobile-responsive design',
    'Secure data management',
    'Easy product management'
  ];

  return (
    <Motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Sweet Shop</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <Motion.button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-xl font-semibold text-white shadow-sm hover:shadow-md transition-all"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </Motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(900px 500px at 20% 0%, ${colors.tertiary}55 0%, transparent 55%), radial-gradient(900px 500px at 80% 10%, ${colors.secondary}33 0%, transparent 55%), linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent} 60%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <Motion.div className="text-center" variants={container} initial="hidden" animate="show">
            <Motion.div
              variants={item}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <Package className="text-white" size={40} />
            </Motion.div>
            <Motion.h1 variants={item} className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Manage Your Sweet Shop
              <span className="block mt-2" style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                With Confidence
              </span>
            </Motion.h1>
            <Motion.p variants={item} className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              A professional inventory management system designed for modern sweet shops.
              Streamline your operations and grow your business with ease.
            </Motion.p>
            <Motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Motion.button
                onClick={() => navigate('/login')}
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
                className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Motion.button>
              <Motion.button
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-xl border-2 font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.primary, color: colors.primary }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </Motion.button>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div className="grid md:grid-cols-3 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            {stats.map((stat, i) => (
              <Motion.div key={i} variants={item} whileHover={{ y: -6 }} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4"
                  style={{ backgroundColor: `${stat.icon === Package ? colors.primary : stat.icon === User ? colors.secondary : colors.tertiary}15` }}>
                  <stat.icon
                    size={32}
                    style={{ color: stat.icon === Package ? colors.primary : stat.icon === User ? colors.secondary : colors.tertiary }}
                  />
                </div>
                <div className="text-4xl font-bold mb-2" style={{
                  color: stat.icon === Package ? colors.primary : stat.icon === User ? colors.secondary : colors.tertiary
                }}>
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your sweet shop efficiently
            </p>
          </div>
          <Motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            {features.map((feature, i) => (
              <Motion.div
                key={i}
                variants={item}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 transform hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Sweet Shop Management?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform is designed to make inventory management simple, efficient, and enjoyable.
                Join thousands of sweet shop owners who trust our system.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={20} style={{ color: colors.primary }} />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <Package className="text-white" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Create your account today and start managing your inventory like a pro.
                </p>
                <Motion.button
                  onClick={() => navigate('/register')}
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
                  className="w-full px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </Motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <Package className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold">Sweet Shop Management</h3>
            </div>
            <p className="text-white/85 mb-4">
              Professional inventory management for modern sweet shops
            </p>
            <p className="text-white/70 text-sm">
              &copy; 2024 Sweet Shop Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Motion.div>
  );
}

export default LandingPage;
