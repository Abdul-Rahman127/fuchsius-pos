import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { ThemeContext } from '../context/ThemeContext';

const ProductDetails = () => {
  const { darkMode } = useContext(ThemeContext);
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ currency: 'LKR' }); 

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        
        const [productRes, settingsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`),
          axios.get(`http://localhost:5000/api/settings`)
        ]);
        
        setProduct(productRes.data);
        setSettings(settingsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this item from the system?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("Product deleted successfully!");
        navigate('/product-list'); 
      } catch (err) {
        alert("Failed to delete product!");
      }
    }
  };

  if (loading) return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!product) return (
    <div className="text-center mt-20 font-bold text-red-500">Product not found!</div>
  );

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-900' : 'bg-[#F8F9FA]'}`}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8 w-full">
        <TopNav title="Product Details" subtitle={`Inventory / ${product.name}`} darkMode={darkMode} />

        <div className={` p-10 shadow-sm border mt-6 rounded-[30px] overflow-hidden transition-all duration-500 ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Product Image Section */}
            <div className="w-full md:w-1/3">
              <div className={`rounded-[40px] overflow-hidden aspect-square flex items-center justify-center transition-colors border-4 ${
                darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-white shadow-xl'
              }`}>
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop"} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all hover:scale-110 duration-700"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex-1 space-y-8">
              <div>
                <span className="px-4 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {product.category}
                </span>
                <h1 className={`text-4xl font-black mt-4 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {product.name}
                </h1>
                <p className="text-3xl font-black text-blue-600">
                
                  {settings.currency} {product.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-mono">{product.sku}</p>
              </div>

              {/* Stock Stats Grid */}
              <div className={`grid grid-cols-3 gap-6 py-8 border-y ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">Current Stock</p>
                  <p className={`text-2xl font-black ${product.stock < 10 ? 'text-red-500' : darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {product.stock}
                  </p>
                </div>
                <div className="text-center border-x px-4 border-gray-100 dark:border-slate-700">
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">Unit Cost</p>
                  <p className={`text-2xl font-black ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {settings.currency} {product.cost}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">Profit Margin</p>
                  <p className="text-2xl font-black text-green-500">
                    {settings.currency} {(product.price - product.cost).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-8">
                <button className="bg-[#0F172A] text-white px-10 py-4 rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                  EDIT PRODUCT
                </button>
                
                <button 
                   onClick={() => navigate(-1)} 
                   className={`px-10 py-4 rounded-2xl text-xs font-black transition-all active:scale-95 ${
                    darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  BACK TO LIST
                </button>

                <button 
                  onClick={handleDelete}
                  className="bg-red-500/10 text-red-500 px-10 py-4 rounded-2xl text-xs font-black hover:bg-red-500 hover:text-white transition-all active:scale-95 ml-auto"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;