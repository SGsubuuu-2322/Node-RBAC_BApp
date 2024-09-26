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
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: `Username or Password not matched. Try again...`,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      message: `Something went wrong... ${err}`,
    });
  }
};

module.exports = {
  login,
  register,
};
