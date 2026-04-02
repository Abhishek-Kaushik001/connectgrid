const express = require("express");
const {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  deletePost,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);

router.put("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);

// Delete Post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;