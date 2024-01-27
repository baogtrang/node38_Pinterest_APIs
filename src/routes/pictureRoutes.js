import express from "express";
import {
  handleDetailPicAndUser,
  handleListByName,
  hanldeGetListPic,
} from "../controller/pictureController.js";

const pictureRoutes = express.Router();

pictureRoutes.get("/get-list", hanldeGetListPic);
pictureRoutes.get("/list-by-name", handleListByName);
pictureRoutes.get("/detail-pictureAndUser/:picture_id", handleDetailPicAndUser);

export default pictureRoutes;
