import React from 'react';
import { Package } from 'lucide-react';
import { colors } from '../../constants/colors';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <Package className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sweet Shop</h1>
              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
