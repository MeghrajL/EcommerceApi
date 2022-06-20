import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

const route = Router();

route.get("/", authenticateUser, authorizePermissions("admin"), getAllUsers); //first we authenticate the user and then only we authorize the permission
//we can pass multiple roles which are authorized admin like permission in authorizePermissions() function
route.get("/showMe", authenticateUser, showCurrentUser);
route.patch("/updateUser", authenticateUser, updateUser);
route.patch("/updateUserPassword", authenticateUser, updateUserPassword);
route.get("/:id", authenticateUser, getSingleUser);

export default route;
