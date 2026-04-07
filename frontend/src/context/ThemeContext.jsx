import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings');
        if (res.data) {
          updateTheme(res.data.darkMode);
        }
      } catch (err) {
        console.error("Theme load error:", err);
      }
    };
    fetchTheme();
  }, []);

  
  const updateTheme = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    
    <ThemeContext.Provider value={{ darkMode, setDarkMode: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};