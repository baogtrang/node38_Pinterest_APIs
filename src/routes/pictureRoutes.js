import express from "express";
import { verifyToken } from "../config/jwt.js";
import {
  handleCreatePictureByUser,
  handleDeletePic,
  handleDetailPicAndUser,
  handleListByName,
  handleListCreateByUser,
  hanldeGetListPic,
} from "../controller/pictureController.js";

const pictureRoutes = express.Router();

pictureRoutes.get("/get-list", hanldeGetListPic);
pictureRoutes.get("/list-by-name", handleListByName);
pictureRoutes.get("/detail-pictureAndUser/:picture_id", handleDetailPicAndUser);
pictureRoutes.get("/list-create-by-user", verifyToken, handleListCreateByUser);
pictureRoutes.post(
  "/create-picture-by-user",
  verifyToken,
  handleCreatePictureByUser
);
pictureRoutes.delete(
  "/delete-picture-by-user/:picture_id",
  verifyToken,
  handleDeletePic
);

export default pictureRoutes;
