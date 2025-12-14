const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ token: generateToken(user) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user) });
};
