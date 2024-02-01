import express from "express";
import userRoutes from "./userRoutes.js";
import pictureRoutes from "./pictureRoutes.js";
import commentRoutes from "./commentRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/picture", pictureRoutes);
rootRoutes.use("/comment", commentRoutes);

export default rootRoutes;
