const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./Router/authRoutes");
const transactionRoutes = require("./Router/transactionRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRoutes);
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connection Successfully");
  })
  .catch((err) => {
    console.log("Error is : ",err);
  });
