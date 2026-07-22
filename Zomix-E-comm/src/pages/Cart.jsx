import React, { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce((acc, item) => {
    const itemPrice = item.price ? item.price * 84 : 0; 
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  if (cartItems.length === 0) {
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
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen bg-white text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-8">
        <h1 className="text-2xl font-normal tracking-tight">Shopping Cart</h1>
        <button 
          onClick={clearCart}
          className="text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-6">
        {cartItems.map((item) => {
          const itemPrice = item.price ? item.price * 84 : 0;
          const qty = item.quantity || 1;

          return (
            <div key={item.id} className="flex items-center justify-between border-b border-zinc-100 pb-6 gap-4">
              
              {/* Product Info (Image & Name) */}
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded-lg bg-zinc-50 border border-zinc-100"
                />
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">₹{itemPrice} each</p>
                </div>
              </div>

              
              <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 text-sm font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-zinc-900 bg-zinc-50">
                  {qty}
                </span>
                <button 
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 text-sm font-bold transition-colors"
                >
                  +
                </button>

                
              </div>

              {/* Total Price for this item (Price * Quantity) */}
              <div className="text-right min-w-[80px]">
                <p className="text-sm font-semibold text-zinc-900">
                  ₹{(itemPrice * qty).toLocaleString()}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Cart Summary Bottom Section */}
      <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Subtotal</span>
          <p className="text-3xl font-normal text-zinc-900 mt-1">₹{totalAmount.toLocaleString()}</p>
        </div>

        <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl transition-all shadow-sm">
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};

export default Cart;