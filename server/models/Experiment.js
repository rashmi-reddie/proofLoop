const mongoose = require("mongoose");
const User = require("./User");

const experimentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    dailyTarget: {
      type: Number,
      required: true,
    },
    baseline: {
      type: Number,
      required: true,
    },
    prediction: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
      required: true,
    },
    targetUnit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experiment", experimentSchema);
