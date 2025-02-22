const userModel = require("../Model/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Every Field is Required",
      });
    }
    const user = await userModel.findOne({ email })
    if(user){
        return res.status(400).json({
            success: false,
            message: "Email Already Exist",
        });
    }
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Valid Email",
      });
    }
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are Required",
    });
  }
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials-1",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials-2",
      });
    }
    const token = user.jwtToken();
    user.password = undefined;
    const cookiesOption = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOption);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, logout };
