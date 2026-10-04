import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import connectToDB from "./config/database.js";
import authRouter from "./routers/auth.route.js";
import productRouter from "./routers/product.route.js";
import addToCartRouter from "./routers/addToCart.route.js";

const app = express();


connectToDB();


app.use(
  cors({
    origin:"https://nexqaziecomm007.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully");
});


app.use("/api/auth", authRouter);
app.use("/api", productRouter);
app.use("/api/cart", addToCartRouter);

export default app;