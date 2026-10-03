import api from "../../auth/axios/axios"


export const fetchProductsApi = async ()=>{
  try {

    const response = await api.get("/products")
    return response.data
    
  } catch (error) {
    console.log("Error in Fetching Products APi")
    throw error
  }
}

export const fetchProductByIdApi = async(id)=>{
try {
  const response = await api.get(`product/${id}`)
  return response.data
} catch (error) {
  console.log("Error in fetching product by ID",error)
throw error
}
}

export const createProductApi = async (formData)=>{
  try {

    const response = await api.post("/products",formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    return response.data
    
  } catch (error) {
    console.log("Error in Creating Products",error)
    throw error
  }
}

export const updateProductAPI = async (productId, formData) => {
  const response = await api.put(`/products/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};


export const deleteProductAPI = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};