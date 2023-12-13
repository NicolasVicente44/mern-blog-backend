import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


export const getCommentsByPost = async (req, res, next) => {
  try {
    const postSlug = req.params.slug; // Assuming you're using a slug to identify the post

    // Find the post by slug and get its ID
    const post = await Post.findOne({ slug: postSlug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch comments where the 'post' field matches the post's ID
    const comments = await Comment.find({ post: post._id }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { desc, status } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    comment.desc = desc || comment.desc;
    comment.status = status || comment.status; // Update comment status

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({
      parent: comment._id,
    });

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    return res.json({
      message: "Comment was deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default { createComment, updateComment, deleteComment };
