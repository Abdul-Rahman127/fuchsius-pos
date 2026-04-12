import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { ThemeContext } from '../context/ThemeContext'; // ThemeContext import 


const Toggle = ({ label, name, checked, onChange, darkMode }) => (
  <div className={`flex justify-between items-center py-5 border-b ${darkMode ? 'border-slate-700' : 'border-gray-50'} last:border-0`}>
    <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>{label}</span>
    <button
      type="button"
      onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${
        checked ? 'bg-[#0F172A]' : darkMode ? 'bg-slate-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const Settings = () => {
  
  const { setDarkMode } = useContext(ThemeContext);

  const [settings, setSettings] = useState({
    storeName: "Fuchsius Store",
    currency: "USD ($)",
    taxRate: "8%",
    lowStockAlert: true,
    dailyReport: false,
    offlineMode: true,
    darkMode: false 
  });

  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/settings');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error("Fetching error:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5001/api/settings', settings);
      
      
      if (setDarkMode) {
        setDarkMode(settings.darkMode);
      }
      
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving settings.");
    }
  };

  return (
    <div className={`flex min-h-screen w-full font-sans transition-colors duration-500 ${settings.darkMode ? 'bg-slate-900' : 'bg-[#F8F9FA]'}`}>
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 w-full">
        <TopNav title="Settings" subtitle="System Configuration" darkMode={settings.darkMode} />

        <div className="w-full space-y-8 mt-6">
          
          {/* STORE SECTION */}
          <div className={`${settings.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-100 text-gray-800'} p-10 rounded-2xl shadow-sm border transition-all`}>
            <h3 className="text-[10px] font-black text-gray-400 mb-8 tracking-[0.2em] uppercase">Store</h3>
            <div className="space-y-8 text-sm">
              <div className={`flex justify-between items-center border-b pb-5 ${settings.darkMode ? 'border-slate-700' : 'border-gray-50'}`}>
                <span className="text-gray-500 font-medium">Store name</span>
                <input 
                  name="storeName"
                  value={settings.storeName || ""}
                  onChange={handleChange}
                  className={`font-semibold text-right outline-none bg-transparent ${settings.darkMode ? 'text-white focus:text-blue-400' : 'text-gray-800 focus:text-blue-600'}`}
                />
              </div>
              <div className={`flex justify-between items-center border-b pb-5 ${settings.darkMode ? 'border-slate-700' : 'border-gray-50'}`}>
                <span className="text-gray-500 font-medium">Currency</span>
                <select 
                  name="currency"
                  value={settings.currency || "USD ($)"}
                  onChange={handleChange}
                  className={`font-semibold outline-none bg-transparent cursor-pointer ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  <option className={settings.darkMode ? "bg-slate-800" : ""} value="USD ($)">USD ($)</option>
                  <option className={settings.darkMode ? "bg-slate-800" : ""} value="LKR (Rs)">LKR (Rs)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SYSTEM PREFERENCES */}
          <div className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-10 rounded-2xl shadow-sm border transition-all`}>
            <h3 className="text-[10px] font-black text-gray-400 mb-8 tracking-[0.2em] uppercase">System Preferences</h3>
            <div className="flex flex-col">
              <Toggle label="Dark Mode" name="darkMode" checked={settings.darkMode} onChange={handleChange} darkMode={settings.darkMode} />
              <Toggle label="Low stock alerts" name="lowStockAlert" checked={settings.lowStockAlert} onChange={handleChange} darkMode={settings.darkMode} />
              <Toggle label="Daily sales report" name="dailyReport" checked={settings.dailyReport} onChange={handleChange} darkMode={settings.darkMode} />
              <Toggle label="Enable offline functionality" name="offlineMode" checked={settings.offlineMode} onChange={handleChange} darkMode={settings.darkMode} />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="bg-[#0F172A] text-white px-12 py-3.5 rounded-xl text-sm font-black shadow-xl shadow-gray-900/10 hover:bg-[#1a263d] transition-all active:scale-95"
          >
            Save changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;