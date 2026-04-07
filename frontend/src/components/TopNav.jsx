import React from 'react';

const TopNav = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between items-center mb-8 px-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <span className="material-icons text-gray-400 text-sm mr-2">search</span>
          <input 
            type="text" 
            placeholder="Search product or scan barcode..."
            className="outline-none text-sm w-64 bg-transparent text-gray-600" 
          />
          <button className="bg-[#0F172A] text-white px-4 py-1 rounded-lg text-xs font-medium ml-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;