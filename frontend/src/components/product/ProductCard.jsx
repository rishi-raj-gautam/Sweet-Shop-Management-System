import React, { useState } from 'react';
import { RefreshCw, Edit2, Trash2, ShoppingCart } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../../constants/colors';

function ProductCard({ sweet, onPurchase, onDelete, onRestock, onEdit, isAdmin }) {
  const [showRestock, setShowRestock] = useState(false);
  const [restockAmount, setRestockAmount] = useState('');

  return (
    <Motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      {/* Product Image Placeholder */}
      <div 
        className="h-48 w-full relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
            }}
          >
            <ShoppingCart className="text-white" size={40} />
          </div>
        </div>
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {sweet.quantity === 0 ? (
            <span 
              style={{ backgroundColor: colors.accent, color: 'white' }}
              className="px-3 py-1 rounded-full text-xs font-semibold shadow-md"
            >
              Out of Stock
            </span>
          ) : sweet.quantity < 50 ? (
            <span 
              style={{ backgroundColor: colors.tertiary, color: 'white' }}
              className="px-3 py-1 rounded-full text-xs font-semibold shadow-md"
            >
              Low Stock
            </span>
          ) : (
            <span 
              style={{ backgroundColor: colors.primary, color: 'white' }}
              className="px-3 py-1 rounded-full text-xs font-semibold shadow-md"
            >
              In Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Product Info */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{sweet.name}</h3>
          <p className="text-sm text-gray-500 font-medium">{sweet.category}</p>
        </div>

        {/* Price and Quantity */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Price</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                ${sweet.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Available</p>
              <p className="text-xl font-bold text-gray-900">{sweet.quantity}</p>
            </div>
          </div>
        </div>

        {/* Restock Form */}
        {showRestock && isAdmin && (
          <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <input
              type="number"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              placeholder="Enter quantity"
              min="1"
            />
            <Motion.button
              onClick={() => {
                if (restockAmount && parseInt(restockAmount) > 0) {
                  onRestock(sweet.id, parseInt(restockAmount));
                  setRestockAmount('');
                  setShowRestock(false);
                }
              }}
              style={{ backgroundColor: colors.primary }}
              className="w-full py-2.5 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Apply Restock
            </Motion.button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Motion.button
            onClick={() => onPurchase(sweet)}
            disabled={sweet.quantity === 0}
            style={{ 
              backgroundColor: sweet.quantity === 0 ? '#ccc' : colors.primary,
              background: sweet.quantity === 0 ? '#ccc' : `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})`
            }}
            className="w-full py-3 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            whileTap={sweet.quantity === 0 ? undefined : { scale: 0.98 }}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </Motion.button>

          {isAdmin && (
            <div className="flex gap-2">
              <Motion.button 
                onClick={() => {
                  setShowRestock(!showRestock);
                  if (showRestock) setRestockAmount('');
                }}
                className="flex-1 py-2.5 border-2 rounded-lg font-medium transition-all hover:bg-gray-50 flex items-center justify-center space-x-1"
                style={{ borderColor: colors.primary, color: colors.primary }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={16} />
                <span>Restock</span>
              </Motion.button>
              <Motion.button 
                onClick={onEdit}
                className="flex-1 py-2.5 border-2 rounded-lg font-medium transition-all hover:bg-gray-50 flex items-center justify-center space-x-1"
                style={{ borderColor: colors.secondary, color: colors.secondary }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </Motion.button>
              <Motion.button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this product?')) {
                    onDelete(sweet.id);
                  }
                }}
                className="px-3 py-2.5 border-2 rounded-lg font-medium transition-all hover:bg-red-50 flex items-center justify-center"
                style={{ borderColor: colors.accent, color: colors.accent }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
              </Motion.button>
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  );
}

export default ProductCard;
