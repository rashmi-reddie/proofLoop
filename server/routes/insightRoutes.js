const express = require("express");
const router = express.Router();
const getInsights = require("../controllers/insightController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("INSIGHT ROUTES LOADED");

router.get(
  "/:experimentId/insights",
  authMiddleware,

  getInsights,
);

module.exports = router;
