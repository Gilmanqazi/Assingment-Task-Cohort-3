import {useDispatch,useSelector} from "react-redux"
import { addToCart, getCart } from "../state/cartSlice"
import { removeFromCartApi } from "../api/cart.api"

export const useCart = ()=>{

  const {cart,loading,error} = useSelector((state)=>state.cart)

const dispatch = useDispatch()

  const addToCartHook = (cartData)=>{
    return dispatch(addToCart(cartData)).unwrap()
  }

  const getCartHook = ()=>{
    return dispatch(getCart()).unwrap()
  }


  const removeFromCartHook = async (cartId) => {
    try {
      const res = await removeFromCartApi(cartId);
      // Delete hone ke baad cart reload kar lein
      getCartHook(); 
      return res;
    } catch (err) {
      console.error("Remove error:", err);
      alert(err?.response?.data?.message || "Could not remove item");
    }
  };

return {
  cart,loading,error,addToCartHook,getCartHook,removeFromCartHook
}

  
}