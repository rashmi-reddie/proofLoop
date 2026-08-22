const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const {
  createDailyLog,
  getDailyLogs,
} = require("../controllers/logController");

router.post(
  "/:experimentId/logs",
  authMiddleware,
  uploadMiddleware.array("attachments", 5),
  createDailyLog,
);
router.get("/:experimentId/logs", authMiddleware, getDailyLogs);

module.exports = router;
