import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {

  const {user} = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login/Register to access this page");
    }
  }, [user]);

  if (!user) {
   
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;