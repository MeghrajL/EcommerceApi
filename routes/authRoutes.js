import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);

export default route;
