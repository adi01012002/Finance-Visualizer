const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  editTransaction,
} = require("../Controller/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const transactionRouter = express.Router();

transactionRouter.post("/add/:id", authMiddleware, addTransaction);
transactionRouter.get("/get/:id", authMiddleware, getTransactions);
transactionRouter.post("/delete/:id", authMiddleware, deleteTransaction);
transactionRouter.get("/edit/:id", authMiddleware, editTransaction);

module.exports = transactionRouter;
