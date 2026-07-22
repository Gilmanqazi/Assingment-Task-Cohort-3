import React, { useState } from 'react'
import products from '../data/Product'
import ProductCard from '../components/ProductCard'


const Shop = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState("")



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
      {products
          ?.filter((product) => {
            // Safe check: agar kisi product ka title na ho toh crash na ho
             const matchesSearch = product?.title?.toLowerCase().includes(searchQuery.toLowerCase())

             const matchesCategory = selectedCategory === "all" || product?.category?.name?.toLowerCase() === selectedCategory.toLowerCase()

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