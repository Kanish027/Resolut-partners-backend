import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      public_id: String,
      image_url: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = new mongoose.model("Post", postSchema);

export default Post;
