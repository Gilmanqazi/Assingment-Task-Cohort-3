import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js";
import jwt from "jsonwebtoken"
export const registerController = async(req,res)=>{
  try {
    
    const {name,email,password,confirmPassword,role} = req.body;

    if(!name || !email || !password || !confirmPassword){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
      return res.status(409).json({
        success:false,
        message:"User already exists with this email"
      })
    }

    const hashPass = await bcrypt.hash(password,12)

    const user = await userModel.create({
      name,
      email,
      password:hashPass,
      role:role || "user"
    })


    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during registration",
    });
  }
}

export const loginController = async (req,res)=>{
  try {

    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid credentials"
      })
    }

const isValidPassword = await bcrypt.compare(password,user.password)

if(!isValidPassword){
  return res.status(401).json({
    success:false,
    message:" Invalid credentials"
  })
}

const accessToken = createAccessToken({
  userId:user._id,
  role:user.role
})

const refreshToken = createRefreshToken({
  userId:user._id,
  role:user.role
})

res.cookie("refreshToken",refreshToken,{
  httpOnly:true,
  secure:false,
  sameSite:"strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
})

user.refreshToken = refreshToken;
await user.save()

return res.status(200).json({
  success:true,
  message:"LoggedIn successfully",
  accessToken,
  data:{
    user:{
      id:user._id,
      name:user.name,
      email:user.email,
    }
  }
})
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during login",
    });
  }
}

export const refreshController = async (req,res)=>{
 

    const refreshToken = req.cookies?.refreshToken

    if(!refreshToken){
      return res.status(401).json({
        success:false,
        message:"Invalid refresh Token"
      })
    }

    try {

const decoded = readRefreshToken(refreshToken)

const {userId,role} = decoded

const user = await userModel.findById(userId)

if (!user || refreshToken !== user.refreshToken) {
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure:false,
    sameSite: "strict",
  });

  return res.status(403).json({
    success: false,
    message: "Invalid, expired, or reused refresh token. Re-login required.",
  });
}

const accessToken = createAccessToken({
  userId,role
})

const newRefreshToken = createRefreshToken({
  userId,role
})


await userModel.findByIdAndUpdate(user._id,{
  refreshToken:newRefreshToken
})

res.cookie("refreshToken", newRefreshToken, {
  httpOnly: true,
  secure:false,
  sameSite:"strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
})

return res.status(201).json({
success:true,
message:"Token rotated successfully",
accessToken,
data:{
  user:{
    id:user._id,
    name:user.name,
    email:user.email
  }
}
})

  
  } catch (error) {

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(401).json({
      success: false,
      message: error.message || "Invalid Refresh Token",
    });
  }
}

export const getMeController = async (req,res)=>{
  try {

    const {userId,role} = req.user

    const user = await userModel.findById(userId)

    if(!user){
      return res.status(404).json({
success:false,
message:"User Not Found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"User fetched succesfully",
      data: {
        user: {
          id: user._id,
            email: user.email,
            name: user.name,
        }
    }
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during fetching user",
    });
  }
}

export const logOutController = async (req,res)=>{
  try {

    const refreshToken = req.cookies?.refreshToken

    if(!refreshToken){
      res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
      });
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }

    await userModel.findOneAndUpdate(
      {refreshToken},
      {refreshToken:null}
    )

    res.clearCookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure:false,
      sameSite:"strict"
    })
    
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during logout",
    });
  }
};