import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl text-center">
        <div className="bg-fuchsia-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">F</div>
        <h2 className="text-2xl font-bold text-gray-800">FUCHSIUS</h2>
        <p className="text-gray-500 text-sm mb-8">Mobile POS System</p>
        
        <div className="text-left space-y-4">
          <input type="email" placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 outline-none" />
          <div className="relative">
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            <span onClick={() => navigate('/forgot-password')} className="absolute right-0 top-[-25px] text-xs text-fuchsia-600 cursor-pointer hover:underline">Forgot Password?</span>
          </div>
          <button onClick={() => navigate('/roles')} className="w-full py-3 bg-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:bg-fuchsia-700 transition-all">Sign In</button>
        </div>
        
        <button onClick={() => navigate('/pin-login')} className="mt-6 text-sm font-medium text-fuchsia-600 hover:underline">Login with PIN Code</button>
      </div>
    </div>
  );
};

export default Login;