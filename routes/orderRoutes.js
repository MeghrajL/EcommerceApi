import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} from "../controllers/orderController.js";

const route = Router();

route.post("/", authenticateUser, createOrder);
route.get("/", [authenticateUser, authorizePermissions("admin")], getAllOrders);

route.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);

route.get("/:id", authenticateUser, getSingleOrder);
route.patch("/:id", authenticateUser, updateOrder);

export default route;
