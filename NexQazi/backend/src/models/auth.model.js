import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    minLength:[3, "Name must be more than 3 character"],
    maxLength:[20, "Name must be less than 20 character"]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:[true,"Email address is already exists"],
    trim:true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    trim:true,
    select:false
  },
  role:{
    type:String,
    enum:["user","seller"],
    default:"user"
  },
  refreshToken:{
    type:String
  }
},{timestamps:true})


const userModel = mongoose.model("users",userSchema)

export default userModel