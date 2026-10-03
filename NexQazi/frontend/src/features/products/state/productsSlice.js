import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createProductApi, deleteProductAPI, fetchProductByIdApi, fetchProductsApi, updateProductAPI } from "../api/product.api";


export const fetchAllProducts = createAsyncThunk(
  "api/fetchAllProducts",
  async (_,{rejectWithValue})=>{

    try {
      
      const data = await fetchProductsApi()
      return data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "fetching All Products failed"
      );
    }
  }
)

export const fetchProductById = createAsyncThunk(
  "api/fetchProductById",
  async (id,{rejectWithValue})=>{
try {
  const data = await fetchProductByIdApi(id)
  return data
  
} catch (error) {
  return rejectWithValue(
     error?.response?.data?.message || "fetching Product By Id  failed"
  )
}
  }
)

export const createProductThunk = createAsyncThunk(
  "api/createProducts",
  async (formData,{rejectWithValue})=>{
try {
  const data = await createProductApi(formData)
  return data
  
} catch (error) {
  return rejectWithValue(
    error.response?.data?.message || "CreateProduct Failed"
  )
}
  }
)

export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      return await updateProductAPI(productId, formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await deleteProductAPI(productId);
      return { productId, ...data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const initialState={
  products:[],
  loading:true,
  error:null,
  selectedProduct:null
}

const productSlice = createSlice({
  name:"products",
  initialState,
  reducers:{
    clearProductError: (state)=>{
      state.error = null
    }
  },


  extraReducers:(builder)=>{
    builder
    .addCase(fetchAllProducts.pending,(state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(fetchAllProducts.fulfilled,(state,action)=>{
      state.loading = false
      state.products = action.payload?.data?.products || action.payload?.products || []
    })
    .addCase(fetchAllProducts.rejected,(state,action)=>{
      state.loading = false
      state.error = action.payload
    })

    .addCase(fetchProductById.pending,(state)=>{
      state.loading = true
      state.selectedProduct = null
    })
    .addCase(fetchProductById.fulfilled,(state,action)=>{
      state.loading = false
      state.selectedProduct = action.payload?.data?.product || action.payload?.product || []

    })
    .addCase(fetchProductById.rejected,(state,action)=>{
      state.loading = false
      state.error = action.payload

    })

    .addCase(createProductThunk.pending,(state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(createProductThunk.fulfilled, (state,action)=>{
      state.loading = false
      if(action.payload?.product){
state.payload.unshift(action.payload?.product)
      }
    })
    .addCase(createProductThunk.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload
    })

    .addCase(updateProductThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload?.product;
      if (updatedProduct) {
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      }
    })
    .addCase(updateProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Delete
    .addCase(deleteProductThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (p) => p._id !== action.payload.productId
      );
    })
    .addCase(deleteProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
})


export const { clearProductError } = productSlice.actions;
export default productSlice.reducer


