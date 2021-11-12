const Post = require("../models/posts");
const fs = require("fs");
module.exports = class API {
  static async fetchAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async createPost(req, res) {
    const post = req.body;
    const imageName = req.file.filename;
    post.image = imageName;
    try {
      await Post.create(post);
      res.status(201).json({
        msg: "Post create successfuly",
      });
    } catch (error) {
      res.status(400).json({
        msg: "error",
      });
    }
  }
  static async updatePost(req, res) {
    const id = req.params.id;
    let newImage = "";
    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (error) {
        console.log(error);
      }
    } else {
      newImage = req.body.old_image;
    }

    const newPost = req.body;
    newPost.image = newImage;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({
        msg: "update post is success...!",
      });
    } catch (error) {
      res.status(400).json({
        msg: error,
      });
    }
  }
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({
        msg: "post deleted successfully..",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
