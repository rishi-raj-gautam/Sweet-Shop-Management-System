import React, { useEffect, useState } from 'react';
import { ShoppingCart, Search, Plus, LogOut, Home, Package, User, Menu, X, Bell, Settings } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../constants/colors';
import ProductCard from '../components/product/ProductCard';
import ProductModal from '../components/product/ProductModal';
import { api } from '../api/apiConfig';

function Dashboard({ user, onLogout }) {
  const [sweets, setSweets] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const normalizeSweet = (s) => ({
    ...s,
    id: s?._id || s?.id
  });

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.sweets.list();
        if (!active) return;
        setSweets(Array.isArray(data) ? data.map(normalizeSweet) : []);
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load products');
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const handlePurchase = async (sweet) => {
    try {
      const updated = normalizeSweet(await api.sweets.purchase(sweet.id));
      setSweets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setCart((prev) => [...prev, sweet]);
    } catch (err) {
      setError(err?.message || 'Purchase failed');
    }
  };

  const handleSave = async (data) => {
    setError('');
    try {
      if (editingSweet) {
        const updated = normalizeSweet(await api.sweets.update(editingSweet.id, data));
        setSweets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } else {
        const created = normalizeSweet(await api.sweets.create(data));
        setSweets((prev) => [...prev, created]);
      }
      setShowModal(false);
      setEditingSweet(null);
    } catch (err) {
      setError(err?.message || 'Save failed');
    }
  };

  const categories = Array.from(new Set((sweets || []).map((s) => s.category))).filter(Boolean).sort();

  const filteredSweets = sweets.filter((sweet) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      sweet.name.toLowerCase().includes(q) ||
      sweet.category.toLowerCase().includes(q);

    const matchesCategory = !filterCategory || sweet.category === filterCategory;

    const min = minPrice === '' ? null : Number(minPrice);
    const max = maxPrice === '' ? null : Number(maxPrice);
    const matchesPrice =
      (min === null || sweet.price >= min) &&
      (max === null || sweet.price <= max);

    const matchesStock = !inStockOnly || sweet.quantity > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Package, label: 'Products', active: false },
  ];

  return (
    <Motion.div
      className="min-h-screen"
      style={{
        background: `radial-gradient(900px 500px at 10% 0%, ${colors.tertiary}30 0%, transparent 60%), radial-gradient(900px 500px at 90% 10%, ${colors.secondary}20 0%, transparent 60%), linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent} 60%)`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Professional Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
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

              {/* Navigation Links - Desktop (inside navbar row) */}
              <div className="hidden lg:flex items-center gap-1 ml-6">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      item.active ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={item.active ? { backgroundColor: colors.primary } : {}}
                  >
                    <item.icon size={18} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': colors.primary }}
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingCart size={22} className="text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: colors.secondary }}>
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}>
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.email || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.isAdmin ? 'Admin' : 'Customer'}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/70 bg-white/90 backdrop-blur-md">
            <div className="px-4 py-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': colors.primary }}
                />
              </div>

              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      item.active ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={item.active ? { backgroundColor: colors.primary } : {}}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Motion.div
            className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </Motion.div>
        )}

        <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': colors.primary }}
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="w-full lg:w-44">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': colors.primary }}
                placeholder="0"
              />
            </div>

            <div className="w-full lg:w-44">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': colors.primary }}
                placeholder="Any"
              />
            </div>

            <label className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700 font-medium">In stock only</span>
            </label>

            <Motion.button
              type="button"
              onClick={() => {
                setFilterCategory('');
                setMinPrice('');
                setMaxPrice('');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-lg border-2 font-semibold"
              style={{ borderColor: colors.primary, color: colors.primary }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear Filters
            </Motion.button>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Dashboard</h2>
              <p className="text-gray-600">Manage your inventory and track sales</p>
            </div>
            {user?.isAdmin && (
              <Motion.button
                onClick={() => setShowModal(true)}
                className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={20} />
                <span>Add Product</span>
              </Motion.button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{sweets.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}15` }}>
                <Package className="text-gray-700" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sweets.filter(s => s.quantity > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.secondary}15` }}>
                <Package className="text-gray-700" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.tertiary}15` }}>
                <ShoppingCart className="text-gray-700" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${sweets.reduce((sum, s) => sum + (s.price * s.quantity), 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.accent}15` }}>
                <Package className="text-gray-700" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No products found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map(sweet => (
              <ProductCard
                key={sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onEdit={() => {
                  setEditingSweet(sweet);
                  setShowModal(true);
                }}
                onDelete={async (id) => {
                  setError('');
                  try {
                    await api.sweets.remove(id);
                    setSweets((prev) => prev.filter((s) => s.id !== id));
                  } catch (err) {
                    setError(err?.message || 'Delete failed');
                  }
                }}
                onRestock={async (id, amt) => {
                  setError('');
                  try {
                    const updated = normalizeSweet(await api.sweets.restock(id, amt));
                    setSweets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
                  } catch (err) {
                    setError(err?.message || 'Restock failed');
                  }
                }}
                isAdmin={user?.isAdmin}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <ProductModal
          sweet={editingSweet}
          onClose={() => {
            setShowModal(false);
            setEditingSweet(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Click outside to close dropdowns */}
      {(userMenuOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserMenuOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </Motion.div>
  );
}

export default Dashboard;
