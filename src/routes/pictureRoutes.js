import express from "express";
import { hanldeGetListPic } from "../controller/pictureController.js";

const pictureRoutes = express.Router();

pictureRoutes.use("/get_list", hanldeGetListPic);

export default pictureRoutes;
