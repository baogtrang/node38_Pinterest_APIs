import express from "express";
import { getCommentsByPicture } from "../controller/commentController.js";

const commentRoutes = express.Router();

// route to get COMMENT DETAIL by picture_id
commentRoutes.get("/:picture_id/comment-detail", getCommentsByPicture);

export default commentRoutes;
