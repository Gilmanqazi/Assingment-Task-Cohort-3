import productModel from "../models/product.model.js";
import { deleteFromImageKit, uploadToImageKit } from "../services/magekit.service.js";

export const createProductController = async (req, res) => {
  try {
    const { title, description, sizes, price } = req.body;
  
    if (!title || !description || !sizes || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (title, description, sizes, price)",
      });
    }

  
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

  
    let parsedSizes = sizes;
    let parsedPrice = price;

    if (typeof sizes === "string") {
      parsedSizes = JSON.parse(sizes);
    }
    if (typeof price === "string") {
      parsedPrice = JSON.parse(price);
    }

  
    const uploadPromise = req.files.map((file) =>
      uploadToImageKit(file.buffer, file.originalname)
    );
    const uploadResult = await Promise.all(uploadPromise);

    const imageUrls = uploadResult.map((result) => ({
      url: result.url,
      fileId: result.fileId,
    }));

  
    const sellerId = req.user?.userId || req.user?._id;

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: Number(parsedPrice.amount),
        currency: parsedPrice.currency || "INR",
      },
      sizes: parsedSizes,
      images: imageUrls,
      seller: sellerId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: { product},
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error in creating product",
    });
  }
};


export const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

 
    const currentUserId = req.user.userId || req.user._id;
    if (!product.seller.equals(currentUserId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    const { title, description, sizes, price } = req.body;

 
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;


    if (sizes !== undefined) {
      product.sizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    }


    if (price !== undefined) {
      const parsedPrice = typeof price === "string" ? JSON.parse(price) : price;
      
      if (parsedPrice?.amount !== undefined) {
        product.price.amount = Number(parsedPrice.amount);
      }
      if (parsedPrice?.currency !== undefined) {
        product.price.currency = parsedPrice.currency;
      }
    }

   
    if (req.files && req.files.length > 0) {
      const uploadPromise = req.files.map((file) =>
        uploadToImageKit(file.buffer, file.originalname)
      );

      const uploadResult = await Promise.all(uploadPromise);

     
      const newImages = uploadResult.map((result) => ({
        url: result.url,
        fileId: result.fileId,
      }));

      product.images = newImages;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Update Product error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to Update Product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }


    const currentUserId = req.user.userId || req.user._id;
    if (!product.seller.equals(currentUserId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((image) => {
        if (image?.fileId) {
          return deleteFromImageKit(image.fileId);
        }
      });
      await Promise.all(deletePromises);
    }

   
    await productModel.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};


export const fetchAllProducts = async (req,res)=>{
  try {
    
    const products = await productModel.find()

    if(products.length === 0){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"All products fetched successfully",
      data:{
        products
      }
    })

  } catch (error) {
    console.error("Fetch products error:", error);

    return res.status(500).json({
        success: false,
        message: "Failed to fetch products"
    });
  }
}

export const getProductById = async (req,res)=>{
  try {

    const {id} = req.params

const product = await productModel.findById(id)

if(!product){
  return res.status(404).json({
    success:false,
    message:"Product Not Found With This id"
  })
}

return res.status(200).json({
  success:true,
  message:"Product fetched successfull by id",
  product
})
    
  } catch (error) {
    console.error("getProductById error:", error);

    return res.status(500).json({
        success: false,
        message: "Failed to get productById"
    });
  }
}