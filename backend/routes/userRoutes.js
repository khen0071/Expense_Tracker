import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  authUser,
  registerUser,
  logOut,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOut);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
