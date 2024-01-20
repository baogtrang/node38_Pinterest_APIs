import express from "express";
import userRoutes from "./userRoutes.js";
import pictureRoutes from "./pictureRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/picture", pictureRoutes);

export default rootRoutes;
