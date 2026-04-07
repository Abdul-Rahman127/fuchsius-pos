/** @type {import('tailwindcss').Config} */
export default {
  
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-dark': '#0F172A',
        'bg-light': '#F8F9FA',
        
        'dark-card': '#1E293B', 
        'dark-bg': '#0F172A',
      }
    },
  },
  plugins: [],
}