import express from "express";

import { checkPictureSaved } from "../controller/savedPicturesController.js";
import { verifyToken } from "../config/jwt.js";

const savedPicturesRoutes = express.Router();

savedPicturesRoutes.get(
  "/:pictures_id/is-saved",
  verifyToken,
  checkPictureSaved
);

export default savedPicturesRoutes;
