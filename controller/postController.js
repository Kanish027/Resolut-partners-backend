import { v2 as cloudinary } from "cloudinary";
import Post from "../model/postModel.js";

const createPost = async (req, res) => {
  try {
    const { description, image } = req.body;
    if (image) {
      const myCloud = await cloudinary.uploader.upload(image, {
        folder: "resolute_partners",
      });
      const newPost = new Post({
        description,
        image: {
          public_id: myCloud.public_id,
          image_url: myCloud.secure_url,
        },
      });
      const post = await newPost.save();

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: post,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Please upload an image",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { description, image } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.description = description || post.description;

    if (image) {
      await cloudinary.uploader.destroy(post.image.public_id);

      const myCloud = await cloudinary.uploader.upload(image, {
        folder: "resolute_partners",
      });

      post.image = {
        public_id: myCloud.public_id,
        image_url: myCloud.secure_url,
      };
    }

    post = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);

    if (!deletePost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPost, getPosts, getPost, updatePost, deletePost };
