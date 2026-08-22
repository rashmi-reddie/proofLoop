const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

module.exports = router;
