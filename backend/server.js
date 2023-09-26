import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

//Parse body
app.use(express.json());
//Allow to send form data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API READY");
});

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
