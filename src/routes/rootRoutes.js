import express from "express";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);

export default rootRoutes;
