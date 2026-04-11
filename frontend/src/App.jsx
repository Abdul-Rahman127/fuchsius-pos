import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import './App.css';

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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;