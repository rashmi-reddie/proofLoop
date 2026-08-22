const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      return res.json({
        message: "User registered Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err,
    });
  }
};

module.exports = { registerUser, loginUser };
