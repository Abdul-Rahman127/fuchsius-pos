import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SalesPage from './pages/SalesPage';
import Setting from './pages/Setting';
import { ThemeProvider } from './context/ThemeContext'; 

function App() {
  return (
    <ThemeProvider> 
      <Router>
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