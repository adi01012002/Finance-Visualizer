const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;

// // Dummy data
// const dummyTransactions = [
//   {
//     userId: "60d0fe4f5311236168a109ca",
//     amount: 50,
//     description: "Grocery shopping",
//     date: new Date("2023-10-01"),
//     category: "Food",
//   },
//   {
//     userId: "60d0fe4f5311236168a109ca",
//     amount: 100,
//     description: "Electricity bill",
//     date: new Date("2023-10-05"),
//     category: "Utilities",
//   },
//   {
//     userId: "60d0fe4f5311236168a109ca",
//     amount: 20,
//     description: "Coffee with friends",
//     date: new Date("2023-10-10"),
//     category: "Entertainment",
//   },
//   {
//     userId: "60d0fe4f5311236168a109ca",
//     amount: 200,
//     description: "Monthly rent",
//     date: new Date("2023-10-15"),
//     category: "Housing",
//   },
//   {
//     userId: "60d0fe4f5311236168a109ca",
//     amount: 75,
//     description: "New shoes",
//     date: new Date("2023-10-20"),
//     category: "Shopping",
//   },
// ];

// module.exports= dummyTransactions;
