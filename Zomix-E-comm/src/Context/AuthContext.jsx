/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  const registerUser = (name,email, password) => {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    
  
    if (users.find(u => u.email === email)) {
      alert("User already exists! Please login.");
      return false;
    }

    const newUser = { name,email, password };
    users.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(users));
    alert("Registration Successful! Now you can login.");
    return true;
  };

 
  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    const matchedUser = users.find(u => u.email === email && u.password === password);

    if (matchedUser) {
      setUser({name:matchedUser.name, email:matchedUser.email});
      localStorage.setItem("activeUser", JSON.stringify({ name:matchedUser.name, email:matchedUser.email}));
      return true;
    } else {
      alert("Invalid email or password!");
      return false;
    }
  };

  
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