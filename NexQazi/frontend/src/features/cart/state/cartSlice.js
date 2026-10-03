import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { getCartApi,addToCartApi, removeFromCartApi } from "../api/cart.api"

export const getCart = createAsyncThunk(
  "api/getCart",
  async(_, {rejectWithValue} )=>{
try {
  const data = await getCartApi()
  return data
} catch (error) {
  return rejectWithValue(
    error?.response?.data?.message || "getCart Failed"
  )
}
  }
)

export const addToCart = createAsyncThunk(
  "api/addTocart",
  async (cartData,{rejectWithValue})=>{
try {
  const data = await addToCartApi(cartData)
  return data
  
} catch (error) {
  return rejectWithValue(
    error?.response?.data?.message || "addToCart Failed"
  )
}
  }
)

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await removeFromCartApi(cartId);
      return cartId; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);



const initialState = {
cart:[],
loading:false,
error:null
}

const cartSlice = createSlice({
  name:"cart",
  initialState,


  extraReducers:(builder)=>{
    builder
    .addCase(getCart.pending,(state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(getCart.fulfilled,(state,action)=>{
      state.loading = false
      state.cart = action.payload?.data || []
    })
    .addCase(getCart.rejected,(state,action)=>{
      state.loading = false
      state.error = action.payload
    })

    .addCase(addToCart.pending,(state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(addToCart.fulfilled,(state)=>{
      state.loading = false
    })
    .addCase(addToCart.rejected,(state,action)=>{
state.loading = false
state.error = action.payload
    })
  }
})

export default cartSlice.reducer