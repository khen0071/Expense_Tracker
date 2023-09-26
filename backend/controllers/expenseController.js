import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";

const fetchExpense = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ userId: req.user._id })
    .sort({ _id: -1 })
    .populate("userId");
  res.json(expenses);
});

const addExpense = asyncHandler(async (req, res) => {
  try {
    const { title, price, paidWith, paymentDetail, category, date } = req.body;

    const userId = req.user._id;

    const expense = new Expense({
      title,
      price,
      paidWith,
      paymentDetail,
      category,
      date,
      userId,
    });

    await expense.save();

    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const expenseId = req.params.expenseId;

    // Find and delete the expense associated with the logged-in user
    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export { fetchExpense, addExpense, deleteExpense };
