import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

/* eslint-disable react-refresh/only-export-components */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState();


  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartItems));
  }, [cartItems]);

  
const {user} = useContext(AuthContext)

useEffect(()=>{
if(user && user.email){
  const savedCart = localStorage.getItem(`userCart_${user.email}`)
  setCartItems(savedCart ? JSON.parse(savedCart) : []);
}else{
  setCartItems([])
}
},[user])


  // 1. Add To Cart with Quantity
const addToCart = (product) => {
  if (!user) {
    toast.warn("Please login first to add items to cart!");
    return;

  }

  const updatedCart = [...cartItems, product]
  setCartItems(updatedCart)

  localStorage.setItem(`userCart_${user.email}`, JSON.stringify(updatedCart));
};

// 2. Remove / Decrement Quantity
const removeFromCart = (productId) => {
  if (!user) return;

  const updatedCart = cartItems.filter((item) => item.id !== productId);
  setCartItems(updatedCart);
  
  localStorage.setItem(`userCart_${user.email}`, JSON.stringify(updatedCart));
};

// 4. Clear Cart (After Order placing)
const clearCart = () => {
  setCartItems([]);
  if (user) {
    localStorage.removeItem(`userCart_${user.email}`);
  }
};




  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};