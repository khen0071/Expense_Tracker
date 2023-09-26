import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  fetchExpense,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// router.route("/").get(protect, fetchExpense).post(protect, addExpense);
router.route("/").get(protect, fetchExpense).post(protect, addExpense);

router.delete("/:expenseId", protect, deleteExpense);
export default router;
