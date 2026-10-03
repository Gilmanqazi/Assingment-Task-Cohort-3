import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const RoleProtected = ({allowdRoles}) => {

  const {user} = useSelector((state)=>state.auth)

  if(!user || !allowdRoles.includes(user.role)){
    return <Navigate to="/home" replace/>
  }
  return <Outlet/>
}

export default RoleProtected