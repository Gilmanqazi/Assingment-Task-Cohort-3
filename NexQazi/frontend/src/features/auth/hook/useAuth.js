import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser,logoutUser, getMe } from "../state/authSlice"


export const useAuth = ()=>{
const dispatch = useDispatch()


const { user, loading, isAuthenticated, error} = useSelector((state)=>state.auth)


const register = (userData)=>{
  return dispatch(registerUser(userData))
}

const login = (userData)=>{
  return dispatch(loginUser(userData))
}

const logout = () => {
  return dispatch(logoutUser());
};

const fetchMe = () => {
  return dispatch(getMe());
};
return{
  user,loading,isAuthenticated,error,register,login,logout,fetchMe
}
}