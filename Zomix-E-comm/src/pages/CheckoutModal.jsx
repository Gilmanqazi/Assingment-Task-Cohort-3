import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Loader2, Home, ArrowLeft, Lock } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutProcess() {
  
  const { user } = useContext(AuthContext);
  const { cartItems , clearCart} = useContext(CartContext);
  
  const [step, setStep] = useState('checkout');

  const [orderDetails, setOrderDetails] = useState({
    itemsCount: 0,
    totalAmount: 0,
    orderId: ''
  });

  const calculateTotal = () => {
    return (cartItems || []).reduce((total, item) => {
      const price = item.price ? (item.price * 84) : 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const totalPrice = calculateTotal();

  const userName = user?.name || user?.displayName || "Guest User";
  const userEmail = user?.email || "user@gmail.com";

  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setOrderDetails({
      itemsCount: cartItems?.length || 0,
      totalAmount: totalPrice,
      orderId: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setStep('processing');
    
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 flex items-center justify-center p-4 font-sans">
      
      {/* 
        FIX 1: Card ki HEIGHT Fix Kar di (h-[580px]) 
        Ab kitne bhi products add ho jayein, Outer Box utna hi rahega.
      */}
      <div className="w-full max-w-lg h-[520px] mt-10 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden relative flex flex-col">
        
        <AnimatePresence mode="wait">
          
          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 flex flex-col h-full"
            >
              {/* Header (Fixed Top) */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-shrink-0">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold text-gray-900">Confirm Order</h2>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Secure
                </span>
              </div>

              {/* Cart Items Section (Flexible & Auto Scrollable) */}
              <div className="my-4 flex-1 min-h-0 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex-shrink-0">
                  Cart Items ({cartItems?.length || 0})
                </p>

                {/* 
                  FIX 2: flex-1 + min-h-0 container ko overflow control me rakhta hai.
                  Scrollbar invisible rahega.
                */}
                <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                      const price = item.price ? (item.price * 84) : 0;
                      const image = item.image || item.images?.[0] || "https://via.placeholder.com/150";

                      return (
                        <div 
                          key={item.id || index} 
                          className="p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center gap-3"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src={image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm font-extrabold text-gray-900 flex-shrink-0">
                            ₹{(price * (item.quantity || 1)).toLocaleString()}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-xs text-gray-400 text-center py-4">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Details & Total (Fixed Bottom Area) */}
              <div className="space-y-3 my-2 bg-white p-4 rounded-2xl border border-gray-100 text-xs sm:text-sm flex-shrink-0">
                <div className="flex justify-between items-center text-gray-500">
                  <span>Customer Name:</span>
                  <span className="font-semibold text-gray-900">{userName}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>Email:</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[180px]">{userEmail}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 border-t border-gray-100 pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span className="font-extrabold text-gray-900 text-base">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button (Fixed Bottom) */}
              <button
                onClick={handlePayment}
                disabled={!cartItems || cartItems.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base flex-shrink-0 mt-2"
              >
                <ShieldCheck className="w-5 h-5" /> Pay ₹{totalPrice.toLocaleString()}
              </button>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-12 flex flex-col items-center justify-center text-center space-y-6 h-full"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full bg-blue-100"
                />
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Processing Payment...
                </h3>
                <p className="text-xs text-gray-400">
                  Please wait, finalizing your order.
                </p>
              </div>

              <div className="w-40 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.3, ease: "easeInOut" }}
                  className="bg-blue-600 h-full rounded-full"
                />
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="p-8 sm:p-10 flex flex-col items-center text-center justify-center space-y-6 h-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 14 }}
                className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">Order Placed!</h3>
                <p className="text-xs text-gray-400">Order ID: {orderDetails.orderId}</p>
              </div>

              <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Total Items:</span>
                  <span className="text-gray-900 font-semibold">{orderDetails.itemsCount} items</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Amount Paid:</span>
                  <span className="text-gray-900 font-bold">₹{orderDetails.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Status:</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-[11px]">Success</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Home className="w-4 h-4" /> Return to Home
              </button>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}