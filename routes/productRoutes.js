import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../controllers/productController.js";

import { getSingleProductReviews } from "../controllers/reviewController.js";

const route = Router();

route.get("/", getAllProducts);
route.post(
  "/",
  [authenticateUser, authorizePermissions("admin")],
  createProduct
);

route.post(
  "/uploadImage",
  [authenticateUser, authorizePermissions("admin")],
  uploadImage
);

route.get("/:id", getSingleProduct);

route.patch(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  updateProduct
);

route.delete(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  deleteProduct
);

route.get("/:id/reviews", getSingleProductReviews);

export default route;
