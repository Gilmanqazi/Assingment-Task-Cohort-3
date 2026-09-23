import mongoose from "mongoose";
import CONFIG from "./config.js";

const connectToDB = async ()=>{
  try {

    await mongoose.connect(CONFIG.MONGO_URI)

    console.log("Connected to MongoDB")
    
  } catch (error) {
    console.log("Error while connectiong mongoDB",error)
    error:error?.message
  }
}

export default connectToDB;