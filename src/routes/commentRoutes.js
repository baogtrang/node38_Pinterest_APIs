import express from "express";
import {
  addCommentToPicture,
  getCommentsByPicture,
} from "../controller/commentController.js";
import { verifyToken } from "../config/jwt.js";

const commentRoutes = express.Router();

// route to get COMMENT DETAIL by picture_id
commentRoutes.get("/:picture_id/comment-detail", getCommentsByPicture);
// route to add a comment for a picture
commentRoutes.post(
  "/:picture_id/add-comment",
  verifyToken,
  addCommentToPicture
);

export default commentRoutes;
