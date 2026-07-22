import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { api } from '../config/Products.api';


const Shop = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState("")
  const [productData, setProductData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduct = async()=>{
    try {
      const res = await api.get("/products")
      setProductData(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log("Error in fetching product api data",error)
    }
  }

  useEffect(()=>{
fetchProduct()
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
    <div className="pt-32 px-10 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
          Our Latest Products
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Explore our bright future collection with premium quality products.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-5xl mx-auto my-6">
  {/* Filter Row Wrapper */}
  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
    
    {/* 1. Search Input Field */}
    <div className="w-full md:w-2/5 relative">
      <input 
        onChange={(e) => setSearchQuery(e.target.value)} 
        type="text" 
        placeholder="Search products..." 
        value={searchQuery} 
        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 shadow-sm" 
      />
      {/* Search Icon (Optional visual touch) */}
      <span className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"><i className="ri-search-line"></i></span>
    </div>

    {/* 2. Select Dropdowns Container */}
    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-center grow justify-end">
      
      {/* Category Dropdown */}
      <select 
        value={selectedCategory}  
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-48 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-white shadow-sm cursor-pointer transition-all duration-200 appearance-none"
      >
        <option value="all">All Categories</option>
        <option value="Clothes">Clothes</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="sepatuku">Sepatuku</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>



      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full sm:w-48 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-white shadow-sm cursor-pointer transition-all duration-200 appearance-none"
      >
        <option value="">Sort By: Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>

    </div>

  </div>
</div>



      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productData
          ?.filter((pro) => {
            // Safe check: agar kisi product ka title na ho toh crash na ho
             const matchesSearch = pro?.title?.toLowerCase().includes(searchQuery.toLowerCase())

             const matchesCategory = selectedCategory === "all" || pro?.category?.name?.toLowerCase() === selectedCategory.toLowerCase()

             return matchesSearch && matchesCategory 
          }).sort((a,b)=>{
            if(sortBy === "lowToHigh"){
              return a.price - b.price
            }
            if(sortBy === "highToLow"){
              return b.price - a.price
            }
            return 0
           })
          .map((product, idx) => (
            <ProductCard key={product?.id || idx} product={product} />
          ))
        }

      </div>
    </div>
  )
}

export default Shop