import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"; 
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Shop from './pages/Shop'; 
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Login from './auth/Login';
import Register from './auth/Register';
import CheckoutProcess from './pages/CheckoutModal';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
const timer = setTimeout(()=>{
  setIsLoading(false)
},1500)

return ()=> clearTimeout(timer)
  },[])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center select-none">
       
        <div className="flex items-center gap-3 animate-pulse">
          <svg 
            width="44" 
            height="44" 
            viewBox="0 0 400 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-xl shadow-md"
          >
            <rect width="400" height="400" rx="80" fill="#18181B"/>
            <path d="M110 130H290L110 270H290" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="290" cy="130" r="18" fill="#2563EB"/>
          </svg>
          <span className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
            ZOMIX<span className="text-blue-600">.</span>
          </span>
        </div>

        
        <div className="w-32 h-[2px] bg-zinc-100 rounded-full mt-6 overflow-hidden relative">
          <div className="w-full h-full bg-zinc-900 rounded-full animate-progress origin-left"></div>
        </div>

        <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mt-4">
          Loading Store...
        </p>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-black text-white'>
      <Navbar />
      
      {/* Pages Container */}
      <div className="bg-gray-50 min-h-screen text-gray-900">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} /> 
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/checkoutProcess' element={<CheckoutProcess/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;