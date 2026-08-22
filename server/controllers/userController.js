const User = require("../models/User.js");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
      name: name,
      email: email,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findById(id);

    if (!user) {
      res.json({ message: "User not found" });
    }
    user.name = name;
    user.email = email;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  editUser,
  deleteUser,
};
