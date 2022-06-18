import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

const route = Router();

route.get("/", getAllUsers);
route.get("/showMe", showCurrentUser);
route.post("/updateUser", updateUser);
route.post("/updateUserPassword", updateUserPassword);
route.get("/:id", getSingleUser);

export default route;
