import cookieParser from "cookie-parser";
import express from "express"
import morgan from "morgan";
import connectToDB from "./config/database.js";
import authRouter from "./routers/auth.route.js";
const app = express()

connectToDB()

app.use(express.json())

app.use(morgan("dev"))

app.use(cookieParser())


app.use("/api/auth",authRouter)

export default app;