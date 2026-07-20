import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { loginUser, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    if (isLoginTab) {
      const success = loginUser(email, password);
      if (success) navigate(-1); 
    } else {
      if(!name || !email || !password) return alert("Please fill all fields")
      const success = registerUser(name,email, password);
      if (success) setIsLoginTab(true); 
      setName("")
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-20 text-gray-900">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md w-full max-w-md">
        <div className="flex justify-around mb-6 border-b pb-2">
          <button 
            className={`font-bold pb-2 ${isLoginTab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLoginTab(true)}
          >
            Login
          </button>
          <button 
            className={`font-bold pb-2 ${!isLoginTab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLoginTab(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginTab && ( 
        <input 
        type="name" 
        placeholder="User Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-500"
      />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm">
            {isLoginTab ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;