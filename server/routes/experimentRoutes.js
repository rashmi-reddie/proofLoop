const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createExperiment,
  getProgress,
  getExperiments,
} = require("../controllers/experimentController");

router.post("/", authMiddleware, createExperiment);

router.get("/", authMiddleware, getExperiments);

router.get("/:experimentId/progress", authMiddleware, getProgress);

module.exports = router;
