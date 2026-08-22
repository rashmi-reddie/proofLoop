const DailyLog = require("../models/DailyLog");
const Experiment = require("../models/Experiment");
const { analyzeImage, analyzeVideo } = require("../services/aiService");

const createDailyLog = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { experimentId } = req.params;
    const { day, date, actualValue, notes, performanceScore } = req.body;

    const experiment = await Experiment.findOne({
      _id: experimentId,
      user: req.userId,
    });

    if (!experiment) {
      return res.status(404).json({
        message: "Experiment not found",
      });
    }

    const attachments = (req.files || []).map((file) => ({
      url: `/uploads/${file.filename}`,
      type: file.mimetype.startsWith("image") ? "image" : "video",
    }));

    const context = `
    Experiment: ${experiment.title}
    Description: ${experiment.description}
    Daily target:${experiment.dailyTarget} ${experiment.targetUnit}
    Today's day:${day}
    Today's claimed practice: ${actualValue} ${experiment.targetUnit}
    User notes: ${notes || "No Notes provided"}`;

    const proofFile = (req.files || []).find(
      (file) =>
        file.mimetype.startsWith("image") || file.mimetype.startsWith("video"),
    );

    let verification = null;

    if (proofFile) {
      if (proofFile.mimetype.startsWith("image/")) {
        verification = await analyzeImage(proofFile.path, context);
      } else if (proofFile.mimetype.startsWith("video/")) {
        verification = await analyzeVideo(
          proofFile.path,
          context,
          proofFile.mimetype,
        );
      }
    }
    console.log("AI VERIFICATION:", verification);

    console.log("ATTACHMENTS:", attachments);

    const log = await DailyLog.create({
      experiment: experimentId,
      day,
      date,
      actualValue,
      notes,
      performanceScore,
      attachments,
      verification,
    });
    return res.status(201).json({
      message: "Log has created",
      log,
    });
  } catch (err) {
    console.error("CREATE DAILY LOG ERROR:", err);
    res.status(500).json({
      message: "server error",
      error: err,
    });
  }
};

const getDailyLogs = async (req, res) => {
  try {
    const { experimentId } = req.params;
    console.log("EXPERIMENT ID:", experimentId);
    console.log("USER ID:", req.userId);

    const experiment = await Experiment.findOne({
      _id: experimentId,
      user: req.userId,
    });

    console.log("FOUND EXPERIMENT:", experiment);

    if (!experiment) {
      return res.json({
        message: "Experiment not found",
      });
    }
    const logs = await DailyLog.find({ experiment: experimentId });

    return res.status(200).json({
      logs,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
      error: err,
    });
  }
};
module.exports = { createDailyLog, getDailyLogs };
