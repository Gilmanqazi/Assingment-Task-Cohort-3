import mongoose from "mongoose";
import CONFIG from "./config.js";

// Connection state track karne ke liye global variable
let isConnected = false;

const connectToDB = async () => {
  // Agar pehle se connect hai toh wahi connection reuse karo
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const db = await mongoose.connect(CONFIG.MONGO_URI, {
      bufferCommands: false, 
      serverSelectionTimeoutMS: 5000, 
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error while connecting mongoDB:", error.message || error);
    isConnected = false;
  }
};

export default connectToDB;