const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({
        message: "Unauthenticated user",
      });
    }
    const token = auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthenticated user",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.json({
      message: "Unauthorized user",
      error: err,
    });
  }
};

module.exports = authMiddleware;
