import React, { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!product) return null;

  const productId = product.id || product._id;
  const isAdded = isInCart ? isInCart(productId) : false;

  const handleProtectedAction = (actionCallback) => {
    if (!user) {
      toast.warn("Please Login/Register");
      navigate('/login');
    } else {
      actionCallback();
    }
  };

  const productImage = product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500";
  const formattedPrice = product?.price ? Math.round(product.price * 84) : 0;

  return (
    <div 
      onClick={() => handleProtectedAction(() => navigate(`/product/${productId}`))} 
      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-full cursor-pointer"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <img 
          src={productImage} 
          alt={product?.title || "Product"} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        {product.category?.name && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Product Details Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-lg leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product?.title || "Untitled Product"}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">
          {product?.description || "No description available."}
        </p>

        {/* Price & Action Button */}
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</p>
            <span className="text-2xl font-bold text-gray-900">
              ₹{formattedPrice.toLocaleString()} 
            </span>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (!isAdded) {
                handleProtectedAction(() => addToCart(product)); 
              }
            }}
            disabled={isAdded}
            className={`font-medium text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              isAdded 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {isAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;