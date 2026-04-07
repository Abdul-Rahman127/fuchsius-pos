import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Context import

const Sidebar = () => {
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext); // Dark mode state 

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Customer', icon: 'person', path: '/customers' },
    { name: 'Product', icon: 'inventory_2', path: '/product-details' },
    { name: 'Sales', icon: 'shopping_cart', path: '/product-list' },
    { name: 'Inventory', icon: 'inventory', path: '/inventory' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <aside 
      className={`w-64 h-screen p-6 flex flex-col fixed left-0 top-0 shadow-xl z-50 transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#0a0f1d] border-r border-slate-800' 
          : 'bg-[#0F172A]' 
      }`}
    >
      {/* Branding Section */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-white uppercase">FUCHSIUS</h1> 
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Point of Sale</p> 
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-white text-[#0F172A] shadow-md font-bold' 
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`material-icons text-xl ${
                isActive ? 'text-[#0F172A]' : 'text-gray-500 group-hover:text-white'
              }`}>
                {item.icon}
              </span>
              <span className="text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className={`pt-6 border-t mt-auto ${darkMode ? 'border-slate-800' : 'border-slate-800'}`}>
        <div className="flex items-center space-x-3 p-3 text-red-400 cursor-pointer hover:bg-red-500/10 rounded-xl transition-all group">
          <span className="material-icons text-xl group-hover:scale-110 transition-transform">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;