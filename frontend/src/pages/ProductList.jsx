import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { ThemeContext } from '../context/ThemeContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  const [products, setProducts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Gadgets',
    price: '',
    cost: '',
    stock: '',
    sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}` // Auto generate SKU
  });

  
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      setIsModalOpen(false); 
      fetchProducts(); 
      setNewProduct({ name: '', category: 'Gadgets', price: '', cost: '', stock: '', sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}` });
    } catch (err) {
      alert("Error adding product");
    }
  };

  const filteredProducts = filterCategory === 'All' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <div className={`flex min-h-screen w-full relative font-sans transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#FBFBFE] text-[#1E293B]'}`}>
      <Sidebar />

      <main className="flex-1 ml-64 p-10 w-full">
        <TopNav title="Products" subtitle="Manage your inventory items" darkMode={darkMode} />

        <div className={`mt-10 rounded-[40px] p-10 shadow-sm border transition-all ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-50'}`}>
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                All Products <span className="text-gray-400 font-medium ml-2">({filteredProducts.length})</span>
              </h2>
            </div>
            
            <div className="flex gap-4 relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl transition-all border ${
                  darkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent'
                }`}
              >
                <span className="material-icons text-xl">filter_list</span> Filters
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className={`absolute top-16 right-48 w-56 border shadow-2xl p-3 z-50 rounded-2xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  {['All', 'Gadgets', 'Accessories', 'Office'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setFilterCategory(cat); setShowFilters(false); }}
                      className={`w-full text-left px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        filterCategory === cat ? 'bg-blue-600 text-white' : darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-8 py-3.5 text-sm font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
              >
                <span className="material-icons">add</span> Add new Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">
                  <th className="pb-6 pl-6 w-16">#</th>
                  <th className="pb-6">Product Name</th>
                  <th className="pb-6">SKU</th>
                  <th className="pb-6">Category</th>
                  <th className="pb-6">Price</th>
                  <th className="pb-6">Status</th>
                  <th className="pb-6 text-right pr-10">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr 
                    key={item._id || index} 
                    onClick={() => navigate(`/product/${item._id}`)}
                    className={`group transition-all duration-300 cursor-pointer ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/40'}`}
                  >
                    <td className="py-6 pl-6 text-gray-500 font-bold">{index + 1}</td>
                    <td className="py-6">
                      <span className={`font-bold text-[15px] ${darkMode ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1E293B] group-hover:text-blue-600'}`}>{item.name}</span>
                    </td>
                    <td className="py-6 text-gray-400 font-medium">{item.sku}</td>
                    <td className="py-6 text-gray-400 font-medium">{item.category}</td>
                    <td className={`py-6 font-black text-[15px] ${darkMode ? 'text-white' : 'text-[#1E293B]'}`}>${item.price}</td>
                    <td className="py-6">
                      
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {item.stock > 0 ? 'In stock' : 'Out of stock'}
                      </span>
                    </td>
                    <td className={`py-6 text-right pr-10 font-bold ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      {item.stock} units
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL FOR ADDING PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-md p-6">
          <div className={`w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in duration-500 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="p-12 space-y-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-4xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>New Product</h2>
                  <p className="text-gray-400 font-medium mt-2">Enter the details to expand your inventory</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className={`p-4 rounded-full transition-all ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <span className="material-icons text-gray-400">close</span>
                </button>
              </div>

              <form className="space-y-8" onSubmit={handleAddProduct}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className={`w-full p-5 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-lg rounded-2xl ${darkMode ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-gray-50 focus:bg-white text-black'}`} 
                      placeholder="Enter product name..." 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Category</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className={`w-full p-5 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold rounded-2xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-50 text-black'}`}
                    >
                      <option>Gadgets</option>
                      <option>Accessories</option>
                      <option>Office</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Stock Quantity</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className={`w-full p-5 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-lg rounded-2xl ${darkMode ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-gray-50 focus:bg-white text-black'}`} 
                      placeholder="0" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Price ($)</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className={`w-full p-5 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-lg rounded-2xl ${darkMode ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-gray-50 focus:bg-white text-black'}`} 
                      placeholder="0.00" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Cost ($)</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.cost}
                      onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                      className={`w-full p-5 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-lg rounded-2xl ${darkMode ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-gray-50 focus:bg-white text-black'}`} 
                      placeholder="0.00" 
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className={`flex-1 py-5 font-black rounded-2xl transition-all ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>Discard</button>
                  <button type="submit" className="flex-1 py-5 font-black text-white bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-900/30 rounded-2xl transition-all">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;