const express=require("express");
const {register} = require("../Controller/authController");
const {login} = require("../Controller/authController");
const {logout} = require("../Controller/authController");
const authRouter=express.Router();
const authMiddleware = require("../middleware/authMiddleware");
authRouter.post("/register",register);
authRouter.post("/login",login)
authRouter.get("/logout",authMiddleware,logout)

module.exports=authRouter;