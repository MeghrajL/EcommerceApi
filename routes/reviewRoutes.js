import { Router } from "express";
import { authenticateUser } from "../middleware/authentication.js";

const route = Router();

import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

route.get("/", getAllReviews);
route.post("/", authenticateUser, createReview);

route.get("/:id", getSingleReview);
route.patch("/:id", authenticateUser, updateReview);
route.delete("/:id", authenticateUser, deleteReview);

export default route;
