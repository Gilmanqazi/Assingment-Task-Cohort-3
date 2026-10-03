import { useDispatch,useSelector } from "react-redux";
import { clearProductError, createProductThunk, deleteProductThunk, fetchAllProducts, fetchProductById, updateProductThunk } from "../../state/productsSlice";



export const useProduct = ()=>{


  const {products,loading,error,selectedProduct} = useSelector((state)=>state.product)
const dispatch = useDispatch()

const fetchProducts = async ()=>{
  return dispatch(fetchAllProducts()).unwrap()
}

const getProductById = async (id)=>{
  return dispatch(fetchProductById(id)).unwrap()
}

const createProduct = async (formData)=>{
  const resultActions = await dispatch(createProductThunk(formData))

  if(createProductThunk.fulfilled.match(resultActions)){
    return resultActions.payload
  }else{
      throw new Error(resultActions.payload || "Failed to create product")
  }

  
}

const updateProduct = async (productId, formData) => {
  const resultAction = await dispatch(
    updateProductThunk({ productId, formData })
  );
  if (updateProductThunk.fulfilled.match(resultAction)) {
    return resultAction.payload;
  } else {
    throw new Error(resultAction.payload || "Failed to update product");
  }
};

const deleteProduct = async (productId) => {
  const resultAction = await dispatch(deleteProductThunk(productId));
  if (deleteProductThunk.fulfilled.match(resultAction)) {
    return resultAction.payload;
  } else {
    throw new Error(resultAction.payload || "Failed to delete product");
  }
};

const clearError = () => dispatch(clearProductError());



return{
  fetchProducts,products,loading,error,getProductById,selectedProduct,createProduct,clearError,updateProduct,deleteProduct
}

}