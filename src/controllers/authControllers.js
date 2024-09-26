const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedpassword, role });
    await user.save();

    return res.status(201).json({
      message: `User has been successfully register with username: ${username}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Something went wrong...`,
    });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
};

module.exports = {
  login,
  register,
};
