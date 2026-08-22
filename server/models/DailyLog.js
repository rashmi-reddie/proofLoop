const mongoose = require("mongoose");
const Experiment = require("./Experiment");

const dailyLogSchema = new mongoose.Schema(
  {
    experiment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experiment",
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    actualValue: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    attachments: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    performanceScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    verification: {
      status: {
        type: String,
        enum: ["consistent", "partially_consistent", "unclear", "inconsistent"],
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
      activityMatch: {
        type: Boolean,
      },

      durationMatch: {
        type: Boolean,
      },

      observedActivity: {
        type: String,
      },

      observedDuration: {
        type: String,
      },

      summary: {
        type: String,
      },
      limitations: [
        {
          type: String,
        },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);
