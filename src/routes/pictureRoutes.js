import express from "express";
import {
  handleListByName,
  hanldeGetListPic,
} from "../controller/pictureController.js";

const pictureRoutes = express.Router();

pictureRoutes.get("/get-list", hanldeGetListPic);
pictureRoutes.get("/list-by-name", handleListByName);

export default pictureRoutes;
