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

if(!process.env.IMAGEKIT_PRIVATE_KEY){
  throw new Error("IMAGEKIT_PRIVATE_KEY: is missing in environmental variable");
}

if(!process.env.IMAGEKIT_PUBLIC_KEY){
  throw new Error("IMAGEKIT_PUBLIC_KEY: is missing in environmental variable");
}

if(!process.env.IMAGEKIT_URL_ENDPOINT){
  throw new Error("IMAGEKIT_URL_ENDPOINT: is missing in environmental variable");
}

const CONFIG = {
  MONGO_URI:process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,
  IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT:process.env.IMAGEKIT_URL_ENDPOINT
}

export default CONFIG;