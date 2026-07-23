import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

/* eslint-disable react-refresh/only-export-components */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  
  useEffect(() => {
    if (user && user.email) {
      const savedCart = localStorage.getItem(`userCart_${user.email}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);


  const saveCartToStorage = (updatedCart) => {
    if (user && user.email) {
      localStorage.setItem(`userCart_${user.email}`, JSON.stringify(updatedCart));
    }
  };

  const isInCart = (productId) => {
    if (!cartItems || cartItems.length === 0) return false;
    return cartItems.some((item) => (item.id || item._id) === productId);
  };

  const addToCart = (product) => {
    if (!user) {
      toast.warn("Please login first to add items to cart!");
      return;
    }

    const productId = product.id || product._id;
    const existingIndex = cartItems.findIndex(
      (item) => (item.id || item._id) === productId
    );

    let updatedCart;

    if (existingIndex > -1) {
     
      updatedCart = cartItems.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
     
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };


  const removeFromCart = (productId) => {
    if (!user) return;

    const updatedCart = cartItems
      .map((item) => {
        const id = item.id || item._id;
        if (id === productId) {
          return { ...item, quantity: (item.quantity || 1) - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); 

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  
  const deleteFromCart = (productId) => {
    if (!user) return;

    const updatedCart = cartItems.filter(
      (item) => (item.id || item._id) !== productId
    );

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  
  const clearCart = () => {
    setCartItems([]);
    if (user && user.email) {
      localStorage.removeItem(`userCart_${user.email}`);
    }
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        isInCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};