import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();
  const roles = [
    { id: 'admin', title: 'Admin', icon: '🛡️', color: 'bg-purple-100' },
    { id: 'manager', title: 'Manager', icon: '📊', color: 'bg-fuchsia-100' },
    { id: 'cashier', title: 'Cashier', icon: '🛒', color: 'bg-pink-100' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-10">Select Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-8 rounded-[2rem] shadow-xl hover:border-fuchsia-500 border-2 border-transparent transition-all flex flex-col items-center">
            <div className={`text-4xl mb-6 p-6 rounded-3xl ${role.color}`}>{role.icon}</div>
            <h3 className="text-2xl font-bold mb-8">{role.title}</h3>
            <button onClick={() => navigate('/users')} className="w-full py-3 bg-gray-50 rounded-xl hover:bg-fuchsia-600 hover:text-white transition-colors font-semibold">Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;