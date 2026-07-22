/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
   const savedUser = localStorage.getItem("activeUser")
   return savedUser ? JSON.parse(savedUser) : null
  });



  
  useEffect(() => {
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // REGISTER USER
  const registerUser = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    

    if (users.find((u) => u.email.toLowerCase() === email)) {
      toast.warn("User already exists! Please login.");
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(users));

    const activeUserData = { name, email };

    localStorage.setItem("activeUser", JSON.stringify(activeUserData));
    setUser(activeUserData); 
    toast.success("Registration Successful!");
    return true;
  };

  // LOGIN USER
  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
   

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (matchedUser) {
      const activeUserData = { name: matchedUser.name, email: matchedUser.email };
      localStorage.setItem("activeUser", JSON.stringify(activeUserData));
      setUser(activeUserData);
      return true;
    } else {
      toast.error("Invalid email or password!");
      return false;
    }
  };

  // LOGOUT USER
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
    
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};