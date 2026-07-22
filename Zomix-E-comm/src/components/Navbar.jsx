import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/Cartcontext';
import { AuthContext } from '../Context/AuthContext';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { cartItems } = useContext(CartContext);
  const { user, logoutUser } = useContext(AuthContext);

  console.log(user,"USERR")

 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        
      <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-zinc-900">

  <svg 
    width="36" 
    height="36" 
    viewBox="0 0 400 400" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg shadow-sm"
  >
    <rect width="400" height="400" rx="80" fill="#18181B"/>
    <path d="M110 130H290L110 270H290" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="290" cy="130" r="18" fill="#2563EB"/>
  </svg>

  {/* Brand Name */}
  <span>ZOMIX<span className="text-blue-600">.</span></span>
</Link>

        {/* 1. Desktop & Tablet Links (Hides on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link to="/" className="hover:text-zinc-950 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-zinc-950 transition-colors">Store</Link>
          <Link to="/about" className="hover:text-zinc-950 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-zinc-950 transition-colors">Contact</Link>
        </div>

        {/* Right Actions (Cart, Auth, Hamburger) */}
        <div className="flex items-center gap-5">
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-zinc-800 hover:text-zinc-950 text-xl">
            <i className="ri-shopping-bag-3-line"></i>
            {cartItems?.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-medium">Hi, {user.name}</span>
                <button 
                  onClick={logoutUser} 
                  className="text-xs text-red-500 hover:underline font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* 2. Hamburger Button (Shows ONLY on Mobile) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-zinc-900 text-2xl focus:outline-none"
          >
            {isOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
          </button>

        </div>
      </div>

      {/* 3. Mobile Dropdown Menu (Appears when hamburger is clicked) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 px-6 py-6 space-y-4 text-sm font-medium text-zinc-700 animate-in slide-in-from-top duration-200">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block hover:text-zinc-950 py-1"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            onClick={() => setIsOpen(false)} 
            className="block hover:text-zinc-950 py-1"
          >
            Store
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} 
            className="block hover:text-zinc-950 py-1"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)} 
            className="block hover:text-zinc-950 py-1"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-zinc-100">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Logged in as {user.name}</span>
                <button 
                  onClick={() => { logoutUser(); setIsOpen(false); }} 
                  className="text-xs text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setIsOpen(false)} 
                className="block text-center py-2.5 bg-zinc-900 text-white text-xs font-medium rounded-lg"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;