const config = require("../../config");
const jwt = require("jsonwebtoken");

const isEmployee = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith("Bearer")) {
      return res.json({ errors: "Unauthorized access" });
    }
    const token = auth.split(" ")[1];
    if (!token || token === "null") {
      return res.json({ errors: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
    if (!decoded || !decoded.id) {
      return res.json({ errors: "Unauthorized access" });
    }
    req.employeId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ errors: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: "Invalid token" });
    }
    res.json({ errors: "Access Denied" });
  }
};

module.exports = isEmployee;
