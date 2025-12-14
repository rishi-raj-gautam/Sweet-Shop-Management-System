import React from 'react';
import { Package, Mail, Phone } from 'lucide-react';
import { colors } from '../../constants/colors';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Sweet Shop</h3>
                <p className="text-xs text-gray-400">Management System</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional inventory management for modern sweet shops.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@sweetshop.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sweet Shop Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
