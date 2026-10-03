import api from "../axios/axios"



export const registerApi = async (name,email,password, confirmPassword,role)=>{

  try {
    const response = await api.post("/auth/register",{
      name,email,password, confirmPassword,role
    })
    return response.data
    
  } catch (error) {
    console.log("Error from RegisterApi",error)
    throw error;
    
  }
}

export const loginApi = async (email,password)=>{
  try {

    const response = await api.post("/auth/login",{
      email,password
    })
    return response.data
    
  } catch (error) {
    console.log("Error from LoginApi")
    throw error
  }
}

export const getMeApi = async () => {
  try {
    const response = await api.get("/auth/getMe");
  return response.data;
  } catch (error) {
    console.log("Error in getMeApi",error)
    throw error
  }
};

export const refreshApi = async ()=>{
  try {

    const response = await api.post("/auth/refresh-token")
    return response.data
    
  } catch (error) {
    console.log("Error in refreshApi",error)
    throw error
  }
}

export const logoutApi = async ()=>{
  try {

    const response = await api.post("/auth/logout")
    return response.data
    
  } catch (error) {
    console.log("Error in Logout APi",error)
    throw error
  }
}