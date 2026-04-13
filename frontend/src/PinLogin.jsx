import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PinLogin = () => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-8">Enter PIN</h2>
        <div className="flex gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 border-fuchsia-300 ${pin.length > i ? 'bg-fuchsia-600' : ''}`}></div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((val) => (
            <button key={val} onClick={() => val === 'OK' ? navigate('/roles') : setPin(pin + val)} className="w-16 h-16 rounded-full bg-gray-100 font-bold hover:bg-fuchsia-600 hover:text-white transition-all">{val}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinLogin;