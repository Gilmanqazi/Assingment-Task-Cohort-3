import cookieParser from "cookie-parser";
import express from "express"
import morgan from "morgan";
import connectToDB from "./config/database.js";
import authRouter from "./routers/auth.route.js";
import productRouter from "./routers/product.route.js"
import addToCartRouter from "./routers/addToCart.route.js"
import cors from "cors"
const app = express()

connectToDB()

app.use(express.json())

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  methods:["POST","GET","DELETE","PUT"]
}))

app.use(morgan("dev"))

app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api",productRouter)
app.use("/api/cart",addToCartRouter)

export default app;