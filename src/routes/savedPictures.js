import express from "express";

import {
  checkPictureSaved,
  getPicListByUserId,
} from "../controller/savedPicturesController.js";
import { verifyToken } from "../config/jwt.js";

const savedPicturesRoutes = express.Router();

savedPicturesRoutes.get(
  "/:pictures_id/is-saved",
  verifyToken,
  checkPictureSaved
);

savedPicturesRoutes.get("/:user_id/pictures", verifyToken, getPicListByUserId);

export default savedPicturesRoutes;
