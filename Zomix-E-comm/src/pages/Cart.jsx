import React, { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProcess from './CheckoutModal';

const Cart = () => {

  const { cartItems, addToCart, removeFromCart, clearCart, deleteFromCart } = useContext(CartContext);

  const navigate = useNavigate()

  
  const totalAmount = cartItems.reduce((acc, item) => {
    const itemPrice = item.price ? Math.round(item.price * 84) : 0; 
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen text-center flex flex-col items-center justify-center bg-white">
        <i className="ri-shopping-bag-line text-6xl text-zinc-300 mb-4"></i>
        <h2 className="text-2xl font-normal text-zinc-900 mb-2">Your cart is empty</h2>
        <p className="text-zinc-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen bg-white text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-8">
        <h1 className="text-xl sm:text-2xl font-normal tracking-tight">Shopping Cart ({cartItems.length})</h1>
        <button 
          onClick={clearCart}
          className="text-xs font-medium text-zinc-400 hover:text-rose-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-6">
        {cartItems.map((item) => {
          const itemPrice = item.price ? Math.round(item.price * 84) : 0;
          const qty = item.quantity || 1;

          return (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-6 gap-4">
              
              {/* Product Info (Image & Title) */}
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={item.images?.[0] || item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"} 
                  alt={item.title} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-zinc-50 border border-zinc-100 shrink-0"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-zinc-900 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">₹{itemPrice.toLocaleString()} each</p>
                </div>
              </div>

              {/* Quantity Counter & Price Action */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                
                {/* Quantity Controls */}
                <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-white">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 text-sm font-bold transition-colors"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-50 min-w-[32px] text-center">
                    {qty}
                  </span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 text-sm font-bold transition-colors"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Total Price for item */}
                <div className="text-right min-w-[90px]">
                  <p className="text-sm font-semibold text-zinc-900">
                    ₹{(itemPrice * qty).toLocaleString()}
                  </p>
                </div>

                {/* Delete Icon Button */}
                <button
                  onClick={() => deleteFromCart ? deleteFromCart(item.id) : removeFromCart(item.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50"
                  title="Remove product"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* Cart Summary Bottom Section */}
      <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-auto text-left">
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Subtotal</span>
          <p className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-0.5">₹{totalAmount.toLocaleString()}</p>
        </div>

        <button onClick={
          ()=> navigate("/checkoutProcess")
        } className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-zinc-900/10">
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};

export default Cart;