console.log("E-Commerce API");
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import "express-async-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
const port = process.env.PORT;

//route
app.get("/", (req, res) => {
  res.status(200).send("All products");
});
app.get("/api/v1", (req, res) => {
  //console.log(req.cookies);
  console.log(req.signedCookies);
  res.status(200).send("All products");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//db and server connect
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on Port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
