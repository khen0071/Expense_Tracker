import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import expenses from "./data/expenses.js";
import User from "./models/userModel.js";
import Expense from "./models/expenseModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Expense.deleteMany();

    const createdUsers = await User.insertMany(users);

    const johnUser = createdUsers[0]._id;

    const sampleExpense = expenses.map((expense) => {
      return { ...expense, userId: johnUser };
    });

    await Expense.insertMany(sampleExpense);

    console.log("Data Imported.");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Expense.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
