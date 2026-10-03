import api from "../../auth/axios/axios"

export const addToCartApi = async({productId, quantity, size})=>{
  try {

    const response = await api.post("/cart",{
      productId, quantity:Number(quantity), size
    })
    return response.data
    
  } catch (error) {
    console.log("Error in addToCart API",error)
    throw error
  }
}

export const getCartApi = async()=>{
  try {

    const response = await api.get("/cart/getCart")
    return response.data
    
  } catch (error) {
    console.log("Error in getCert API",error)
    throw error
  }
}


export const removeFromCartApi = async (cartId) => {
  const response = await api.delete(`/cart/${cartId}`);
  return response.data;
};