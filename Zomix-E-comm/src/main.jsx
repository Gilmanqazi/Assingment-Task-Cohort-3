import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/Cartcontext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
   <AuthProvider>
     <CartProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
   </AuthProvider>
)
