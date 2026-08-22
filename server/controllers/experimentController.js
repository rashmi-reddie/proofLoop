const Experiment = require("../models/Experiment");
const DailyLog = require("../models/DailyLog");

const createExperiment = async (req, res) => {
  try {
    const {
      user,
      title,
      description,
      category,
      startDate,
      endDate,
      dailyTarget,
      baseline,
      prediction,
      status,
      targetUnit,
    } = req.body;

    const experiment = await Experiment.create({
      user: req.userId,
      title,
      description,
      category,
      startDate,
      endDate,
      dailyTarget,
      baseline,
      prediction,
      status,
      targetUnit,
    });

    return res.status(201).json({
      message: "Experiment Successfully created",
      experiment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const { experimentId } = req.params;
    console.log("EXPERIMENT ID:", experimentId);
    console.log("REQ USER ID:", req.userId);
    // const experiment = await Experiment.findOne({
    //   _id: experimentId,
    //   user: req.userId,
    // });
    const experimentById = await Experiment.findById(experimentId);
    console.log("EXPERIMENT BY ID:", experimentById);

    const experimentByUser = await Experiment.findOne({
      user: req.userId,
    });
    console.log("EXPERIMENT BY USER:", experimentByUser);

    const experiment = await Experiment.findOne({
      _id: experimentId,
      user: req.userId,
    });
    if (!experiment) {
      return res.json({
        message: "Experiment not found",
      });
    }
    console.log("FOUND EXPERIMENT:", experiment);

    //Get all logs
    const logs = await DailyLog.find({ experiment: experimentId });

    //no.of days logged
    const daysCompleted = logs.length;

    //total actual practice
    const totalPractice = logs.reduce(
      (sum, log) => (sum += log.actualValue),
      0,
    );

    //How much practice was expected
    const expectedPractice = daysCompleted * experiment.dailyTarget;

    //Percenteage of expected practice completed
    const completionRate =
      expectedPractice === 0 ? 0 : (totalPractice / expectedPractice) * 100;

    //Total experiment duration
    const totalDays =
      Math.ceil(
        (new Date(experiment.endDate) - new Date(experiment.startDate)) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    //Remaining days
    const remainingDays = totalDays - daysCompleted;

    return res.status(200).json({
      experiment: experiment.title,
      totalDays,
      daysCompleted,
      dailyTarget: experiment.dailyTarget,
      targetUnit: experiment.targetUnit,
      totalPractice,
      expectedPractice,
      completionRate,
      remainingDays,
      startDate: experiment.startDate,
      endDate: experiment.endDate,
    });

    //Streak
    const calculateStreak = (logs, dailyTarget) => {
      let streak = 0;
      logs.sort((a, b) => b.day - a.day);
      for (const log of logs) {
        if (log.actualValue >= dailyTarget) {
          streak += 1;
        } else {
          break;
        }
      }
      return streak;
    };
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err,
    });
  }
};

const getExperiments = async (req, res) => {
  try {
    const experiments = await Experiment.find({
      user: req.userId,
    });
    return res.status(200).json(experiments);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { createExperiment, getProgress, getExperiments };
