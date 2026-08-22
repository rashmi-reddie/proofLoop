const Experiment = require("../models/Experiment");
const DailyLog = require("../models/DailyLog");

const calculateAverageImprovement = (logs, baseline) => {
  if (logs.length < 2) {
    return 0;
  }

  logs.sort((a, b) => a.day - b.day);

  const firstLog = logs[0];
  const latestLog = logs[logs.length - 1];

  const totalImprovement = latestLog.performanceScore - baseline;

  const elapsedDays = latestLog.day - firstLog.day;

  if (elapsedDays === 0) {
    return 0;
  }

  const averageImprovement = totalImprovement / elapsedDays;

  return averageImprovement;
};

const getInsights = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const experiment = await Experiment.findOne({
      _id: experimentId,
      user: req.userId,
    });
    if (!experiment) {
      return res.json({
        message: "Experiment not found",
      });
    }
    const totalDays =
      Math.ceil(
        (new Date(experiment.endDate) - new Date(experiment.startDate)) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    const logs = await DailyLog.find({ experiment: experimentId });
    if (logs.length === 0) {
      return res.status(200).json({
        baseline: experiment.baseline,
        currentScore: experiment.baseline,
        prediction: experiment.prediction,
        improvement: 0,
        averageImprovement: 0,
        predictionProgress: 0,
        remainingDays: totalDays,
        projectedScore: experiment.baseline,
        trajectory: "on track",
      });
    }

    //Latest log
    logs.sort((a, b) => b.day - a.day);

    const latestLog = logs[0];

    //current performance
    const currentScore = latestLog.performanceScore;

    //Improvement from Baseline
    const improvement = currentScore - experiment.baseline;

    //  Calculate average improvement
    const averageImprovement = calculateAverageImprovement(
      logs,
      experiment.baseline,
    );

    //Progress toward prediction
    const predictionProgress =
      ((currentScore - experiment.baseline) /
        (experiment.prediction - experiment.baseline)) *
      100;

    const remainingDays = totalDays - latestLog.day;

    const remainingPotential = 100 - currentScore;

    const projectedImprovement = remainingPotential * 0.5;

    const projectedScore = Math.min(100, currentScore + projectedImprovement);

    let trajectory;

    if (projectedScore >= experiment.prediction) {
      trajectory = "ahead";
    } else if (remainingDays > 0) {
      trajectory = "on track";
    } else {
      trajectory = "behind";
    }

    return res.status(200).json({
      baseline: experiment.baseline,
      currentScore,
      prediction: experiment.prediction,
      improvement,
      averageImprovement,
      predictionProgress,
      remainingDays,
      projectedScore,
      trajectory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = getInsights;
