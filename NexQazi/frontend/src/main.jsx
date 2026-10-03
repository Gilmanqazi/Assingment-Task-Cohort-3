
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './app/app.route.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import { ToastContainer } from 'react-toastify'
import AuthInitialization from './features/auth/shared/AuthInitialization.jsx'
import { setupAxiosInterceptors } from './features/auth/axios/axiosInterceptor.js'
import { PersistGate } from "redux-persist/integration/react";

setupAxiosInterceptors(store)


createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
    <AuthInitialization>
   <RouterProvider router={router}/>
   </AuthInitialization>
   <ToastContainer/>
   </PersistGate>
   </Provider>

)
