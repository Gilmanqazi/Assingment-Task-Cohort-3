import addToCartModel from "../models/addToCart.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req,res)=>{
  try {

    const {productId,quantity:rawQuantity,size} = req.body;

    const quantity = Number(rawQuantity)

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    const product = await productModel.findById(productId)

    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product Not Found!"
      })
    }

    const selectedSize =  product.sizes.find(s => s.size === size)


    if(!selectedSize){
      return res.status(400).json({
        success:false,
        message:"Size Not Available"
      })
    }

    if(selectedSize.stock < quantity){
      return res.status(400).json({
        success:false,
        message:"Insufficiant Stock"
      })
    }

   const cart = await addToCartModel.findOne({
    user:req.user.userId,
    product:productId,
    size:size})

   

    if(cart){
      const newQuantity = cart.quantity + quantity


    if(newQuantity > selectedSize.stock){
      return res.status(400).json({
        success:false,
        message:"Insufficiant Stock"
      })
    }
    
cart.quantity = newQuantity
await cart.save()

return res.status(200).json({
  success: true,
  message: "Product added to cart successfully",
  data: cart
});

    }else{
      const newCart = await addToCartModel.create({
        user:req.user.userId,
        product:productId,
        size,
        quantity
      })

      return res.status(201).json({
        success: true,
        message: "Product added to cart successfully",
        data: newCart
      });
    } 
  } catch (error) {
    console.error("Add to Cart Error:", error);
  
    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart"
    });
  }
}


export const getCartController = async (req,res)=>{

  const cart = await addToCartModel.find({
    user:req.user.userId,
  }).populate("product")

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: cart
  });


}



export const removeFromCartController = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { cartId } = req.params; // req.params se Cart Item ki _id lenge

    const deletedCartItem = await addToCartModel.findOneAndDelete({
      _id: cartId,
      user: req.user.userId, // Safety check: sirf logged-in user apna cart item delete kar sake
    });

    if (!deletedCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: cartId,
    });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};
