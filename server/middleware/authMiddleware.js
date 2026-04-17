const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.send("Invalid token");
  }
};