import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import path from "path";

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.static(path.join(__dirname, "../../frontend/dist"))); // serve static assets for frontend
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// liat ttg CORS lagi, bisa ngirim cookie, dan allow url frontend yg valid
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("App listening on http://localhost:7000");
});
