import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import Routes from "./routes/routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/", Routes);

const MONGODB_URL = "mongodb+srv://taskapp:<your-password>@cluster0.yfdjoro.mongodb.net/task_db?retryWrites=true&w=majority";

const port = 5000;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`server running on port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
