import express from "express"
import { getMeController, loginController, logOutController, refreshController, registerController } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"
import { loginValidator, registerValidator } from "../validation/auth.validator.js"

const router = express.Router()


router.post("/register",registerValidator,registerController)
router.post("/login",loginValidator,loginController)
router.post("/refresh-token",refreshController)
router.get("/getMe",authenticateUser,getMeController)
router.post("/logout",authenticateUser,logOutController)

export default router