const userModel = require("../Model/userSchema");
const transactionModel = require("../Model/transactionSchema")

// Add a new transaction
// const addTransaction = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { amount, description, date, category } = req.body;
//     console.log(req.body);
//     const newTransaction = new transactionModel({
//       userId,
//       amount,
//       description,
//       date,
//       category,
//     });
//     await newTransaction.save();
//     res.status(201).json({ message: "Transaction added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const addTransaction = async (req, res) => {
    try {
      const { id} = req.params;
      console.log(id)
      const { amount, description, date, category } = req.body;
  
      // Validate input
      if (!id || !amount || !description || !category) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // Check if user exists
      const userExists = await userModel.findById(id);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      // Create transaction
      const newTransaction = transactionModel({
        userId: id, // Use `id` as `userId`
        amount,
        description,
        date: date || new Date(), // Ensure date is handled properly
        category,
      });
      await newTransaction.save();
      res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: error.message });
   }
};
  

// Get transactions for a user
const getTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await transactionModel.find({ userId:id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await transactionModel.findByIdAndDelete({_id:id});
    // await student.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

// Edit a transaction
const editTransaction = async (req, res) => {
  try {
    const {id}=req.params;
    const { amount, description, date } = req.body;
    await transactionModel.findByIdAndUpdate(id, {amount, description, date},{ new: true });
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
};


// const editTransaction = async (req, res) => {
//     try {
//       const { id } = req.params; // Correctly extract id
//       const { amount, description, date } = req.body; // Get fields from body
  
//       if (!amount || !description || !date) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       const updatedTransaction = await transactionModel.findByIdAndUpdate(
//         id,
//         { amount, description, date }, // Correctly pass update object
//         { new: true } // Return updated document
//       );
  
//       if (!updatedTransaction) {
//         return res.status(404).json({ message: "Transaction not found" });
//       }
  
//       res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
//     } catch (error) {
//       console.error("Error updating transaction:", error);
//       res.status(500).json({ message: error.message });
//     }
//   };
  

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  editTransaction,
};
