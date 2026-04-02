const PostModel = require("../models/Post");

// ================= CREATE POST =================
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const newPost = await PostModel.create({
      content,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ================= GET ALL POSTS =================
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= LIKE / UNLIKE POST =================
const likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user._id;

    // check if already liked
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      await post.save();

      return res.status(200).json({
        message: "Post unliked",
      });
    } else {
      // like
      post.likes.push(userId);
      await post.save();

      return res.status(200).json({
        message: "Post liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= ADD COMMENT =================
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const newComment = {
      user: req.user._id,
      text,
    };

    post.comments.push(newComment);

    await post.save();

    res.status(201).json({
      message: "Comment added",
      comments: post.comments,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= DELETE POST =================
const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  deletePost,
};

