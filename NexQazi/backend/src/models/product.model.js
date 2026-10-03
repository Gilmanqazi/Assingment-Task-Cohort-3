import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Title is required"],
    minLength:2,
    maxLength:100
  },
  description:{
    type:String,
    required:[true,"Description is required"],
    minLength:20,
    maxLength:500
  },
  images:{
    type:[
      {
        url:{
          type:String,
          required:true,
        },
        
         fileId:{
            type:String,
            required:true,
          }
        
      }
    ],
    validate:{
      validator: images => images.length <= 5,
      message:"A product can have at most 5 images"
    }
  },
  price:{
    amount:{
      type:String,
      required:true
    },
    currency:{
      type:String,
      enum:["INR","USD"],
      default:"INR"
    }
  },
  sizes:[
    {
      size:{
        type:String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required:true
      },
      stock:{
        type:Number,
        min:0,
        default:0

      }
    }
  ],
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  }
 
  
})

const productModel = mongoose.model("products",productSchema)

export default productModel