import React, { useState } from 'react';
import { X, Package } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../../constants/colors';

function ProductModal({ sweet, onClose, onSave }) {
  const [formData, setFormData] = useState(
    sweet || { name: '', category: '', price: '', quantity: '' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price && formData.quantity) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
    }
  };

  return (
    <Motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Motion.div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 rounded-t-2xl flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">
              {sweet ? 'Edit Product' : 'Add New Product'}
            </h3>
          </div>
          <Motion.button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow-md"
            style={{ backgroundColor: `${colors.accent}E6`, border: `1px solid ${colors.accent}` }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} style={{ color: colors.primary }} />
          </Motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Motion.button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </Motion.button>
            <Motion.button
              type="submit"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})` }}
              className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileTap={{ scale: 0.98 }}
            >
              {sweet ? 'Update Product' : 'Create Product'}
            </Motion.button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
}

export default ProductModal;
