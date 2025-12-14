import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    console.log("RAW AUTH HEADER =>", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // FIX: Remove Bearer
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    console.log("TOKEN AFTER SPLIT =>", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN =>", decoded);

    req.user = { id: decoded.id || decoded._id };


    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
