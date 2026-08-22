import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-Us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  if (status === "active") {
    return "bg-green-100 text-green-700";
  }

  if (status === "completed") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "paused") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-slate-100 text-slate-600";
};

const getStatusLabel = (status) => {
  if (status === "active") return "● Active";
  if (status === "completed") return "✓ Completed";
  if (status === "paused") return "Ⅱ Paused";

  return status;
};

const Dashboard = () => {
  const [experiments, setExperiments] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [todayProgress, setTodayProgress] = useState({});

  const activeExperiments = () => {
    return experiments.filter((experiment) => experiment.status === "active")
      .length;
  };

  const completedExperiments = () => {
    return experiments.filter((experiment) => experiment.status === "completed")
      .length;
  };

  const progressValues = Object.values(progress);

  const averageProgress =
    progressValues.length === 0
      ? 0
      : progressValues.reduce(
          (sum, experimentProgress) => sum + experimentProgress.completionRate,
          0,
        ) / progressValues.length;

  useEffect(() => {
    const getTodayProgress = async () => {
      const token = localStorage.getItem("token");

      try {
        const progressData = {};

        for (const experiment of experiments) {
          const response = await fetch(
            `http://localhost:3000/api/experiments/${experiment._id}/logs`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await response.json();

          if (!response.ok) {
            continue;
          }

          const logs = data.logs || [];

          const today = new Date().toISOString().split("T")[0];

          const todayLog = logs.find((log) => {
            return log.date.split("T")[0] === today;
          });

          progressData[experiment._id] = {
            actualValue: todayLog?.actualValue || 0,
            target: experiment.dailyTarget,
          };
        }

        setTodayProgress(progressData);
      } catch (err) {
        console.log("TODAY PROGRESS ERROR:", err.message);
      }
    };

    if (experiments.length > 0) {
      getTodayProgress();
    }
  }, [experiments]);

  useEffect(() => {
    const getProgress = async () => {
      const token = localStorage.getItem("token");

      try {
        const progressData = {};

        for (const experiment of experiments) {
          const response = await fetch(
            `http://localhost:3000/api/experiments/${experiment._id}/progress`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await response.json();

          if (response.ok) {
            progressData[experiment._id] = data;
          }
        }
        setProgress(progressData);
      } catch (err) {
        console.log("PROGRESS ERROR:", err.message);
      }
    };
    if (experiments.length > 0) {
      getProgress();
    }
  }, [experiments]);

  useEffect(() => {
    const getExperiments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/experiments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log("EXPERIMENT DATA:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch experiments");
        }

        setExperiments(data);
      } catch (err) {
        console.log("ERROR:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getExperiments();
  }, []);

  return (
    <div className="min-h-screen bg-violet-200 p-8">
      <h1 className="mb-2 text-3xl font-bold">PROOFLOOP</h1>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Heading */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-lg">
              🌱
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              My Experiments
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Track your progress and stay consistent. ✨
          </p>
        </div>

        {/* New Experiment */}
        <button
          type="button"
          onClick={() => navigate("/experiments/new")}
          className="rounded-xl bg-gradient-to-r from-violet-500 to-pink-400 px-5 py-3 font-semibold text-white shadow-sm transition hover:from-violet-600 hover:to-pink-500 hover:shadow-md"
        >
          ✨ New Experiment
        </button>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-violet-200 bg-orange-50 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-violet-700">
                Total Experiments
              </p>

              <p className="mt-3 text-3xl font-bold text-violet-950">
                {experiments.length}
              </p>

              <p className="mt-1 text-xs text-violet-600">
                Experiments created
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-200 text-lg">
              🧪
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-700">
                Active Experiments
              </p>

              <p className="mt-3 text-3xl font-bold text-sky-900">
                {activeExperiments()}
              </p>

              <p className="mt-1 text-xs text-sky-600">Currently in progress</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-lg">
              🌱
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Completed Experiments
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-900">
                {completedExperiments()}
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Successfully completed
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
              ✓
            </div>
          </div>
        </div>

        {/* Average Progress */}
        <div className="rounded-2xl border border-pink-200 bg-pink-50 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-pink-700">
                Average Progress
              </p>

              <p className="mt-3 text-3xl font-bold text-pink-900">
                {Math.round(averageProgress)}%
              </p>

              <p className="mt-1 text-xs text-pink-600">
                Across all experiments
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-lg">
              📈
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <BeatLoader />
        </div>
      ) : experiments.length === 0 ? (
        <div className="rounded-3xl border border-violet-200 bg-blue-50 p-12 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
            🧪
          </div>

          <h3 className="text-xl font-bold text-slate-800">
            No experiments yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Start your first experiment and begin tracking your progress,
            consistency, and results. ✨
          </p>

          <button
            type="button"
            onClick={() => navigate("/experiments/new")}
            className="mt-6 rounded-xl bg-gradient-to-r from-violet-500 to-pink-400 px-5 py-3 font-semibold text-white shadow-sm transition hover:from-violet-600 hover:to-pink-500 hover:shadow-md"
          >
            ✨ Create Experiment
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {experiments.map((experiment) => {
            const experimentProgress = progress[experiment._id];
            const today = todayProgress[experiment._id];

            const todayPercentage = today
              ? Math.min((today.actualValue / today.target) * 100, 100)
              : 0;

            return (
              <div
                key={experiment._id}
                className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-slate-800">
                      {experiment.title}
                    </h3>

                    <p className="mt-2 leading-6 text-slate-500">
                      {experiment.description}
                    </p>
                  </div>

                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      experiment.status,
                    )}`}
                  >
                    {getStatusLabel(experiment.status)}
                  </span>
                </div>

                {/* Dates */}
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-3">
                  <span className="text-sm">📅</span>

                  <p className="text-sm font-medium text-violet-700">
                    {formatDate(experiment.startDate)} →{" "}
                    {formatDate(experiment.endDate)}
                  </p>
                </div>

                {/* Overall Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">
                      Overall Progress
                    </span>

                    <span className="text-sm font-bold text-violet-700">
                      {experimentProgress
                        ? `${Math.round(experimentProgress.completionRate)}%`
                        : "Loading..."}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-violet-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-400 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          experimentProgress?.completionRate || 0,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Days */}
                <div className="mt-4 flex justify-between text-sm">
                  <span className="font-medium text-emerald-600">
                    ✓ {experimentProgress?.daysCompleted || 0} days completed
                  </span>

                  <span className="font-medium text-slate-500">
                    {experimentProgress?.remainingDays ?? "--"} days remaining
                  </span>
                </div>

                {/* Daily Target */}
                <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                      🎯
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                        Daily Target
                      </p>

                      <p className="mt-1 text-lg font-bold text-violet-900">
                        {experiment.dailyTarget} {experiment.targetUnit}
                      </p>
                    </div>
                  </div>

                  {/* Today's Progress */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-600">
                        Today's Progress
                      </p>

                      <p className="text-sm font-bold text-slate-800">
                        {today?.actualValue || 0} / {experiment.dailyTarget}{" "}
                        {experiment.targetUnit}
                      </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-sky-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all duration-700"
                        style={{
                          width: `${todayPercentage}%`,
                        }}
                      />
                    </div>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        todayPercentage >= 100
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {todayPercentage >= 100
                        ? "✓ Today's target completed!"
                        : `${Math.round(todayPercentage)}% of today's target completed`}
                    </p>
                  </div>
                </div>

                {/* View Experiment */}
                <button
                  type="button"
                  onClick={() => navigate(`/experiments/${experiment._id}`)}
                  className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-400 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-violet-600 hover:to-pink-500 hover:shadow-md"
                >
                  View Experiment →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
