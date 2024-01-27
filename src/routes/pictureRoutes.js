import express from "express";
import {
  handleDetailPicAndUser,
  handleListByName,
  handleListCreateByUser,
  hanldeGetListPic,
} from "../controller/pictureController.js";
import { verifyToken } from "../config/jwt.js";

const pictureRoutes = express.Router();

pictureRoutes.get("/get-list", hanldeGetListPic);
pictureRoutes.get("/list-by-name", handleListByName);
pictureRoutes.get("/detail-pictureAndUser/:picture_id", handleDetailPicAndUser);
pictureRoutes.get("/list-create-by-user", verifyToken, handleListCreateByUser);

export default pictureRoutes;
