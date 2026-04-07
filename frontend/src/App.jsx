import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Settings from './pages/Settings';
import ProductDetails from './pages/ProductDetails';
import ProductList from "./pages/ProductList";
import { ThemeProvider } from './context/ThemeContext'; 
import './App.css';

function App() {
  return (
    <ThemeProvider> 
      <Router>
        <div className="app-container min-h-screen">
          <Routes>
            
            <Route path="/" element={<Navigate to="/settings" />} />
            
          
            <Route path="/settings" element={<Settings />} />
            
            {/* All Products List Route */}
            <Route path="/product-list" element={<ProductList />} />

            
            <Route path="/product/:id" element={<ProductDetails />} />

          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;