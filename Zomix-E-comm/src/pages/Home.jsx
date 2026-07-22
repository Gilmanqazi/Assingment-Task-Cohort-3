import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/Cartcontext';


const Home = ({product}) => {
  const { user } = useContext(AuthContext);
   const { cartItems } = useContext(CartContext)

const uniqueCategories = [...new Set(product?.map(pro => pro?.category?.name))].filter(Boolean);
const cartValue = cartItems.reduce((acc,items)=> acc+ (items.price ? items.price * 84 : 0),0)

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between pt-28">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center">
        
        {/* Subtle Greeting */}
        <p className="text-sm font-medium tracking-widest uppercase text-zinc-400 mb-4">
          { `Welcome Back, ${user?.name}`}
        </p>

        {/* Minimal Bold Typography */}
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-zinc-900 max-w-2xl leading-tight mb-6">
          Simplicity in every detail. Essentials for everyday life.
        </h1>

        {/* Simple Description */}
        <p className="text-base text-zinc-500 max-w-md mb-8 leading-relaxed">
          Carefully curated, high-quality products designed to fit seamlessly into your daily routine. No noise, just pure utility.
        </p>

        {/* Clean Call to Action */}
        <div className="flex items-center gap-6">
          <Link 
            to="/shop" 
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-all"
          >
            Shop Collection
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 underline underline-offset-4 transition-all"
          >
            Our Story
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto my-12 w-full">
  
  {/* Box 1: Cart Items */}
  <Link to='/cart' className="border border-zinc-100 bg-zinc-50/40 p-6 rounded-xl flex items-center justify-between shadow-sm">
    <div className="space-y-1">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Cart Items</h4>
      <p className="text-2xl font-normal text-zinc-900">{cartItems?.length || 0}</p>
      <span className="text-xs text-zinc-500">In your bag</span>
    </div>
    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-lg">
      <i className="ri-shopping-bag-3-line"></i>
    </div>
  </Link>

  {/* Box 2: Cart Value */}
  <Link to='/cart' className="border border-zinc-100 bg-zinc-50/40 p-6 rounded-xl flex items-center justify-between shadow-sm">
    <div className="space-y-1">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Cart Value</h4>
      
      <p  className="text-2xl font-normal text-zinc-900">₹{cartValue || "0.00"}</p>
      <span className="text-xs text-zinc-500">Ready to checkout</span>
    </div>
    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-lg">
      <i className="ri-money-rupee-circle-line"></i>
    </div>
  </Link>

  {/* Box 3: Total Categories */}
  <div className="border border-zinc-100 bg-zinc-50/40 p-6 rounded-xl flex items-center justify-between shadow-sm">
    <div className="space-y-1">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Categories</h4>
      <p className="text-2xl font-normal text-zinc-900">{uniqueCategories?.length || 0}</p>
      <span className="text-xs text-zinc-500">To explore</span>
    </div>
    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-lg">
      <i className="ri-price-tag-3-line"></i>
    </div>
  </div>

</div>
      

      
      <div className="border-t border-zinc-100 bg-zinc-50/50 py-8 w-full">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">01 / Shipping</h4>
            <p className="text-sm text-zinc-600">Free standard shipping on all orders over ₹999.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">02 / Authenticity</h4>
            <p className="text-sm text-zinc-600">100% original products sourced directly from manufacturers.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">03 / Returns</h4>
            <p className="text-sm text-zinc-600">Hassle-free 7-day exchange and return policy.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;