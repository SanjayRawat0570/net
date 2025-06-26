import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ protectRoute error:", err.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

