import express from "express"
import { authenticateSeller, authenticateUser } from "../middleware/auth.middleware.js"
import { createProductController, deleteProductController, fetchAllProducts, getProductById, updateProductController } from "../controllers/product.controller.js"
import multer from "multer"
import { createProductValidator, parseSizes, updateProductValidator } from "../validation/product.validator.js"

const storage = multer.memoryStorage()

const upload = multer({storage:storage,limits:{fileSize: 5 * 1024 * 1024}})

const router = express.Router()

//Private
router.post("/products",authenticateUser,authenticateSeller,upload.array("images",5),parseSizes,createProductValidator,createProductController)

router.put("/products/:id",authenticateUser,authenticateSeller,upload.array("images",5),parseSizes,updateProductValidator,updateProductController)

router.delete("/products/:id",authenticateUser,authenticateSeller,deleteProductController)

//Public
router.get("/products",fetchAllProducts)
router.get("/product/:id",getProductById)

export default router