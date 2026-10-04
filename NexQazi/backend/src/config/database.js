import mongoose from "mongoose";
import CONFIG from "./config.js";

let cachedPromise = null;

const connectToDB = async () => {

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(CONFIG.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, 
      connectTimeoutMS: 30000,
    });
  }

  try {
    await cachedPromise;
    console.log("Connected to MongoDB");
  } catch (error) {
    cachedPromise = null; 
    console.error("MongoDB Connection Error:", error.message || error);
    throw error;
  }

  return mongoose.connection;
};

export default connectToDB;