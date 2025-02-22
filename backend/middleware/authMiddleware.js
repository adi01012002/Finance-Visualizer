const JWT = require("jsonwebtoken");
const authMiddleware = (req, res,next) => {
  const token = (req.cookies && req.cookies.token) || null;
  // console.log(token)
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised",
    });
  }
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    // console.log(payload)
    req.user = { id: payload.id, email: payload.email };
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

module.exports = authMiddleware;
