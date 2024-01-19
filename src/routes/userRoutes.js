import express from "express";
import { handleLogin } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", handleLogin);

export default userRoutes;
