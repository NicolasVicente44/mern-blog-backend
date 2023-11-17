import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token here
      console.log("Received token:", token);
      console.log("Secret key:", process.env.JWT_SECRET); // Make sure this matches your secret key
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("User ID:", id); // Log the extracted user ID
      req.user = await User.findById(id).select("-password");
      console.log("User:", req.user); // Log the retrieved user
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      let err = new Error("Not authorized, token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, no token");
    error.statusCode = 401;
    next(error);
  }
};

export default authGuard;
