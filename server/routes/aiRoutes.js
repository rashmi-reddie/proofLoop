const express = require("express");
const { analyzeImage } = require("../services/aiService");

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const imagePath = "uploads/1787136169883-manga2.jpg";

    const context = `
    Experiment: Daily Drawing Practice
    Description: Practice digital drawing every day.
    Daily target: 60 minutes
    Today's claimed practice : 45 minutes
    User notes: Worked on a character illustartion.
    `;

    const result = await analyzeImage(imagePath, context);

    console.log("AI RESULT:", result);

    res.status(200).json({
      message: "AI test successful",
      result,
    });
  } catch (err) {
    console.error("AI TEST ERROR:", err);

    res.status(500).json({
      message: "AI test failed",
      error: err.message,
    });
  }
});

module.exports = router;
