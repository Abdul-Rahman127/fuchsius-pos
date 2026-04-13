import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-4 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600 text-3xl">
            🔑
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all"
              placeholder="Enter your registered email"
            />
          </div>

          <button className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 text-center">
          <button className="text-sm font-medium text-fuchsia-600 hover:underline">
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;