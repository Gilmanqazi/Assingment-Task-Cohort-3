import express from "express"
import { getMeController, loginController, logOutController, refreshController, registerController } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"

const router = express.Router()


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/refresh-token",refreshController)
router.get("/getMe",authenticateUser,getMeController)
router.post("/logout",authenticateUser,logOutController)

export default router