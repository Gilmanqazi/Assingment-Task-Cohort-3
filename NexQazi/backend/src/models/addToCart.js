import mongoose from "mongoose";


const addToCartSchema = new mongoose.Schema({
  user:{
type:mongoose.Schema.Types.ObjectId,
ref:"users",
required:true
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products",
    required:true
  },
  size:{
    type:String,
    enum: [ "XS", "S", "M", "L", "XL", "XXL" ],
    required:true
  },
  quantity:{
    type:Number,
  default:1,
    min:1
  }
})

const addToCartModel = mongoose.model("addToCart",addToCartSchema)

export default addToCartModel