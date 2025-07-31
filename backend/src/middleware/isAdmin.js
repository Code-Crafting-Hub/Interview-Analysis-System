const config = require("../../config");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith("Bearer")) {
      return res.json({ errors: "Unauthorized access" });
    }
    const token = auth.split(" ")[1];
    if (!token || token === "null") {
      return res.json({ errors: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);
    if (!decoded || !decoded.id) {
      return res.json({ errors: "Unauthorized access" });
    }
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.json({ errors: "Internal server error" });
  }
};

module.exports = isAdmin;
