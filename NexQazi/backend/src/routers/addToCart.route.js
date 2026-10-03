import express from "express"
import { authenticateUser } from "../middleware/auth.middleware.js"
import { addToCartController, getCartController, removeFromCartController } from "../controllers/cart.controller.js"

const router = express.Router()


router.post("/",authenticateUser,addToCartController)
router.get("/getCart",authenticateUser,getCartController)
router.delete("/:cartId",authenticateUser,removeFromCartController)

export default router