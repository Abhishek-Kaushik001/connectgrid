const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  followUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

// Follow / Unfollow
router.put("/:id/follow", authMiddleware, followUser);

module.exports = router;