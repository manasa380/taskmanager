const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed });

  res.json({ message: "Signup successful" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, message: "Login successful" });
});

module.exports = router;