const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = header?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. token is empty.",
      });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No JWT_SECRET STRING provided.",
      });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded :", decode);
    req.user = {
      id: decode.id,
      role: decode.role,
    }
    // console.log("req.user",req.user)

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = AuthMiddleware;
