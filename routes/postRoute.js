import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/create", createPost);

router.get("/posts", getPosts);
router.get("/post/:id", getPost);

router.put("/update/:id", updatePost);

router.delete("/delete/:id", deletePost);

export default router;
