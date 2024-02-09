import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// app.use("/", (req, res) => {
//   res.send("Hi");
// });
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get;
"*",
  function (req, res) {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
  };
app.listen(PORT, () => {
  console.log("Your server is started at http://localhost:" + PORT);
});
