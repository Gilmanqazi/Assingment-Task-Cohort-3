import { createContext, useState, useEffect } from "react";

/* eslint-disable react-refresh/only-export-components */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("userCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  // const addToCart = (product) => {
  //   setCartItems([...cartItems, product]);
  // };

  
  // const removeFromCart = (indexToFind) => {
  //   const updateCart = cartItems.filter((_,index) => index !== indexToFind);
  //   setCartItems(updateCart);
  // };

  // 1. Add To Cart with Quantity
const addToCart = (product) => {
  const existingIndex = cartItems.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    // Agar product pehle se cart me hai, to bas quantity badhao
    const updatedCart = [...cartItems];
    updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    setCartItems(updatedCart);
  } else {
    // Agar naya product hai, to quantity = 1 ke saath add karo
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};

// 2. Remove / Decrement Quantity
const removeFromCart = (id) => {
  const existingIndex = cartItems.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    const updatedCart = [...cartItems];
    
    if (updatedCart[existingIndex].quantity > 1) {
      // Agar quantity 1 se zyada hai, to 1 kam kar do
      updatedCart[existingIndex].quantity -= 1;
    } else {
      // Agar quantity 1 hi hai, to poora item hata do
      updatedCart.splice(existingIndex, 1);
    }
    
    setCartItems(updatedCart);
  }
};


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};