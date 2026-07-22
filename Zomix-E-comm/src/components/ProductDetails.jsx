import React, { useContext, useEffect, useState } from 'react'
import { useParams ,useNavigate,Link, Navigate} from 'react-router-dom'
import ProductCard from './ProductCard'
import { CartContext } from '../Context/Cartcontext';
import { api } from '../config/Products.api';


const ProductDetails = () => {

  const {id} = useParams()

  const navigate = useNavigate()

  const {addToCart} = useContext(CartContext)

  const [productData, setProductData] = useState([])

   const [isLoading, setIsLoading] = useState(true)



  const ProductsDetailsFnc = async()=>{
    const res = await api.get("/products")
    setProductData(res.data)
    setIsLoading(false)
  }
  
  useEffect(()=>{
    ProductsDetailsFnc()
  },[])

  const currentIndex = productData.findIndex((p)=> p.id === parseInt(id))
  const product = productData[currentIndex]
  

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

  const handlePrev = ()=>{
    if(currentIndex>0){
      const prevProduct = productData[currentIndex - 1]
      navigate(`/product/${prevProduct.id}`)
    }
  }

  const handleNext = ()=>{
    if(currentIndex < productData.length -1){
      const nextProduct = productData[currentIndex + 1]
      navigate(`/product/${nextProduct.id}`)
    }
  }

  const relatedProducts = productData.filter((p)=>p?.category?.name === product.category.name && p.id !== product.id).slice(0,4)
   

  const productImage = product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500";


  return (
    <div className="pt-32 px-10 min-h-screen bg-gray-50 text-gray-900">
      
      {/* Next & Prev Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <i className="ri-arrow-left-s-line"></i> Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === productData.length - 1}
          className="px-4 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          Next <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>

      {/* Main Big Product View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        {/* Left Side: Big Image */}
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
          <img src={productImage} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-between">
          <div>
            {product.category?.name && (
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                {product.category.name}
              </span>
            )}
            <h1 className="text-4xl font-black tracking-tight mt-3 text-gray-900">{product.title}</h1>
            <p className="text-gray-500 mt-4 text-base leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Price</p>
              <span className="text-3xl font-extrabold text-gray-900">₹{product.price ? product.price * 84 : "00"}</span>
            </div>
            <button onClick={()=>addToCart(product)} className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            Add to Cart
          </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Products You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
  

export default ProductDetails