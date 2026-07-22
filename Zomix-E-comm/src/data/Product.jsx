import React, { useEffect, useState } from 'react'
import { api } from '../config/Products.api'
import ProductCard from '../components/ProductCard'

const Product = () => {

  const [productData, setProductData] = useState([])



const ProductCardFnc = async()=>{
  const res = await api.get("/products")
  setProductData(res.data)
}

useEffect(()=>{
  ProductCardFnc()
},[])

  return (

    <div>{
      productData.map((product)=>{
        return <ProductCard key={product.id} product={product}/>
      })}</div>
  )
}

export default Product