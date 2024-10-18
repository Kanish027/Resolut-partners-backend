import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express from "express";
import databaseConnection from "./database/dbConnection.js";
import postRouter from "./routes/postRoute.js";

const app = express();
databaseConnection();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json({ limit: "100mb" }));

app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(express.json());
app.use("/api/v1", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});
