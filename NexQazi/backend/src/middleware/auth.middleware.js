import userModel from "../models/auth.model.js";
import { readAccessToken } from "../utils/auth.utils.js";

export const authenticateUser = async (req,res,next)=>{

  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing or invalid format in request header",
      });
    }

    const accessToken = authHeader.split(" ")[1];


    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token not found in request header",
      });
    }


  try {

    const decoded =  readAccessToken(accessToken)

    const user = await userModel.findById(decoded.userId);

    if (!user || !user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "User logged out or session expired. Please login again.",
      });
    }
    req.user = decoded

    next()
    
  } catch (error) {
    return res.status(401).json({
      success:false,
      errors:error.message || "Invalid or expired access token"
    })
  }
}