import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI: is missing in environmental variable");
}

if(!process.env.ACCESS_TOKEN_SECRET){
  throw new Error("ACCESS_TOKEN_SECRET: is missing in environmental variable");
}

if(!process.env.REFRESH_TOKEN_SECRET){
  throw new Error("REFRESH_TOKEN_SECRET: is missing in environmental variable");
}

if(!process.env.REFRESH_TOKEN_EXPIRY){
  throw new Error("REFRESH_TOKEN_EXPIRY: is missing in environmental variable");
}

if(!process.env.ACCESS_TOKEN_EXPIRY){
  throw new Error("ACCESS_TOKEN_EXPIRY: is missing in environmental variable");
}

const CONFIG = {
  MONGO_URI:process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY
}

export default CONFIG;