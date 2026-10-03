import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainProtected = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default MainProtected;