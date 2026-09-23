import jwt from "jsonwebtoken"
import CONFIG from "../config/config.js"

export const createAccessToken = ({userId,role})=>{
const accessToken = jwt.sign({
  userId,
  role,
},
  CONFIG.ACCESS_TOKEN_SECRET,
{ expiresIn: CONFIG.ACCESS_TOKEN_EXPIRY || '15m' }
)
return accessToken

}

export const readAccessToken = (accessToken)=>{
return jwt.verify(accessToken,CONFIG.ACCESS_TOKEN_SECRET)
}



export const createRefreshToken = ({userId,role})=>{
const refreshToken = jwt.sign({
userId,
role,
},CONFIG.REFRESH_TOKEN_SECRET,
{expiresIn:CONFIG.REFRESH_TOKEN_EXPIRY || "7d"}
)
return refreshToken
}

export const readRefreshToken = (refreshToken)=>{
return jwt.verify(refreshToken,CONFIG.REFRESH_TOKEN_SECRET)
}