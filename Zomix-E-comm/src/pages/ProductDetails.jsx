import React, { useContext } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import products from '../data/Product'
import { CartContext } from '../Context/Cartcontext'
import { toast } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { addToCart, isInCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const currentIndex = products.findIndex((p) => p.id === parseInt(id))
  const product = products[currentIndex]

  if (!product) {
    return <div className="pt-24 sm:pt-32 text-center text-gray-900 font-semibold">Product Not found!</div>
  }

  const productId = product.id || product._id
  const isAdded = isInCart ? isInCart(productId) : false

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevProduct = products[currentIndex - 1]
      navigate(`/product/${prevProduct.id}`)
    }
  }

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      const nextProduct = products[currentIndex + 1]
      navigate(`/product/${nextProduct.id}`)
    }
  }

  const handleProtectedAction = (actionCallback) => {
    if (!user) {
      toast.warn("Please Login/Register")
      navigate('/login')
    } else {
      actionCallback()
    }
  }

  const relatedProducts = products
    .filter((p) => p?.category?.name === product.category?.name && p.id !== product.id)
    .slice(0, 4)

  const productImage = product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-10 lg:px-16 min-h-screen bg-gray-50 text-gray-900">
      
      {/* Next & Prev Navigation Buttons */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          <i className="ri-arrow-left-s-line text-base sm:text-lg"></i> Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === products.length - 1}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          Next <i className="ri-arrow-right-s-line text-base sm:text-lg"></i>
        </button>
      </div>

    {/* Main Big Product View */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm items-center">
  
  {/* Left Side: Image with Height Limit */}
  <div className="w-full max-h-[320px] sm:max-h-[380px] lg:max-h-[420px] aspect-square bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center mx-auto">
    <img 
      src={productImage} 
      alt={product.title} 
      className="w-full h-full object-cover object-center" 
    />
  </div>

  {/* Right Side: Details */}
  <div className="flex flex-col justify-between h-full py-1">
    <div>
      {product.category?.name && (
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full inline-block">
          {product.category.name}
        </span>
      )}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-2 sm:mt-3 text-gray-900 leading-snug">
        {product.title}
      </h1>
      <p className="text-gray-500 mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-4 lg:line-clamp-none">
        {product.description}
      </p>
    </div>

    <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider">Price</p>
        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
          ₹{product.price ? (product.price * 84).toLocaleString() : "00"}
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
        className={`font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16 pb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
            Related Products You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;