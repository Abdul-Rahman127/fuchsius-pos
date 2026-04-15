import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import './App.css';

import LoginPage from './pages/LoginPage';
import SalesPage from './pages/SalesPage';
import Setting from './pages/Setting';
import { ThemeProvider } from './context/ThemeContext'; 


import './App.css';
import ManagerDashboard from "./ManagerDashboard";
import GamingHero from "./GamingHero";


import Customers from './pages/Customer';

function App() {
  return (
    <ThemeProvider>
      <Router>

        <div className="flex min-h-screen">
          <Sidebar />
          <div className="ml-64 flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/customers" />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>

        <div className="app-container min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>

        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;