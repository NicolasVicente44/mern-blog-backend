import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
  getCommentsByPost, // Import the new function
} from "../controllers/commentController.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a new comment
router.post("/", authGuard, createComment);

// Routes for updating and deleting a specific comment
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

// New route for fetching comments by post
// Replace ':slug' with the appropriate parameter if you're using a different identifier for posts
router.get("/byPost/:slug", getCommentsByPost);

export default router;
