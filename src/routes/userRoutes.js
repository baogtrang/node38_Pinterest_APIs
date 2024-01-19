import express from "express";
import { handleLogin, handleSignUp } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", handleLogin);
userRoutes.post("/signup", handleSignUp);

export default userRoutes;
