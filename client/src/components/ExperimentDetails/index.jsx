import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ExperimentDetails = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [insights, setInsights] = useState(null);
  const [insightsError, setInsightsError] = useState("");
  const [logs, setLogs] = useState([]);
  const [logsError, setLogsError] = useState("");

  const [logError, setLogError] = useState("");

  useEffect(() => {
    const getLogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/experiments/${experimentId}/logs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch logs");
        }
        console.log("LOG API RESPONSE:", JSON.stringify(data, null, 2));
        console.log("LOG DATA:", data.logs);
        setLogs(data.logs);
      } catch (err) {
        setLogsError(err.message);
      }
    };
    getLogs();
  }, [experimentId]);

  useEffect(() => {
    const getInsights = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/experiments/${experimentId}/insights`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch insights");
        }

        setInsights(data);
      } catch (err) {
        setInsightsError(err.message);
      }
    };
    getInsights();
  }, [experimentId]);

  useEffect(() => {
    const getProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/experiments/${experimentId}/progress`,
          options,
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch progress");
        }

        setProgress(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getProgress();
  }, [experimentId]);

  console.log(experimentId);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-slate-500">Loading experiment...</p>
      </div>
    );
  }

  const experimentDays = Array.from(
    {
      length: progress.totalDays,
    },
    (_, index) => index + 1,
  );

  let currentDay = 1;

  if (progress.startDate) {
    const startDate = new Date(progress.startDate);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const elapsedDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    currentDay = Math.min(progress.totalDays, Math.max(1, elapsedDays + 1));
  }
  const completionRate = Number(progress?.completionRate) || 0;

  return (
    <div className="min-h-screen bg-violet-100 p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Daily Logs</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your daily practice history
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/experiments/${experimentId}/logs/new`)}
            className="rounded-xl bg-violet-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
          >
            + Add Log
          </button>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Days */}
          <div className="rounded-2xl border border-violet-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
              📅
            </div>

            <p className="text-sm text-slate-500">Total Days</p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {progress.totalDays}
            </p>
          </div>

          {/* Days Completed */}
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-lg">
              🌸
            </div>

            <p className="text-sm font-medium text-slate-500">Days Completed</p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {progress.daysCompleted}
            </p>

            <p className="mt-1 text-sm text-pink-500">Keep going!</p>
          </div>

          {/* Remaining Days */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-lg">
              🌱
            </div>

            <p className="text-sm text-slate-500">Remaining Days</p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {progress.remainingDays}
            </p>

            <p className="mt-1 text-sm text-sky-500">One day at a time</p>
          </div>

          {/* Daily Target */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
              🎯
            </div>

            <p className="text-sm text-slate-500">Daily Target</p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {progress.dailyTarget} each day
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="mt-8 rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between gap-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg">
                📈
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Overall Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  How much of your expected practice you've completed
                </p>
              </div>
            </div>

            {/* Percentage */}
            <div className="shrink-0 text-right">
              <p className="text-4xl font-bold text-violet-600">
                {Math.round(progress.completionRate)}%
              </p>

              <p className="mt-1 text-xs font-medium text-violet-400">
                completed
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-7">
            <div className="h-4 w-full overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-400 transition-all duration-700 ease-out"
                style={{
                  width: `${Math.min(progress.completionRate, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Practice Numbers */}
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {/* Actual Practice */}
            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100">
                  🌸
                </div>

                <p className="text-sm font-medium text-pink-600">
                  Actual Practice
                </p>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-800">
                {progress.totalPractice}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {progress.targetUnit} practiced
              </p>
            </div>

            {/* Expected Practice */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100">
                  🎯
                </div>

                <p className="text-sm font-medium text-sky-600">
                  Expected Practice
                </p>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-800">
                {progress.expectedPractice}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {progress.targetUnit} expected
              </p>
            </div>
          </div>
        </div>

        {insights && (
          <div className="mt-8 rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                ✨
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">Insights</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your current performance and projected outcome
                </p>
              </div>
            </div>

            {/* Main Insights */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Baseline */}
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-violet-600">Baseline</p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {insights.baseline}
                </p>
              </div>

              {/* Current Score */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-sky-600">
                  Current Score
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {insights.currentScore}
                </p>
              </div>

              {/* Improvement */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-emerald-600">
                  Improvement
                </p>

                <p
                  className={`mt-3 text-3xl font-bold ${
                    insights.improvement > 0
                      ? "text-emerald-600"
                      : insights.improvement < 0
                        ? "text-rose-500"
                        : "text-slate-600"
                  }`}
                >
                  {insights.improvement > 0
                    ? `+${insights.improvement}`
                    : insights.improvement}
                </p>
              </div>

              {/* Original Prediction */}
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-orange-600">
                  Original Prediction
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {insights.prediction}
                </p>
              </div>
            </div>

            {/* Projection */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {/* Projected Final Score */}
              <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-pink-600">
                  Projected Final Score
                </p>

                <p className="mt-3 text-4xl font-bold text-pink-600">
                  {insights.projectedScore}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  estimated final outcome
                </p>
              </div>

              {/* Trajectory */}
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5 transition hover:shadow-sm">
                <p className="text-sm font-medium text-violet-600">
                  Trajectory
                </p>

                <p className="mt-3 text-3xl font-bold capitalize text-slate-800">
                  {insights.trajectory}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  based on your current performance
                </p>
              </div>
            </div>
          </div>
        )}

        {/* logs card */}

        {/* Daily Logs */}
        <div className="mt-8 rounded-2xl border border-pink-100 bg-white p-7 shadow-sm">
          {/* Header */}
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-lg">
              🌱
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Daily Logs ✨
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your daily practice history 🌱
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {experimentDays.map((day) => {
              const log = logs.find((item) => item.day === day);

              let dayStatus;

              if (log) {
                dayStatus = "completed";
              } else if (day < currentDay) {
                dayStatus = "skipped";
              } else if (day === currentDay) {
                dayStatus = "today";
              } else {
                dayStatus = "upcoming";
              }

              return (
                <div
                  key={day}
                  className="relative border-l-2 border-violet-100 pb-9 pl-9 last:border-l-0"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[10px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                      dayStatus === "completed"
                        ? "bg-emerald-400"
                        : dayStatus === "today"
                          ? "bg-violet-500"
                          : dayStatus === "skipped"
                            ? "bg-rose-300"
                            : "bg-slate-300"
                    }`}
                  />

                  {/* Day Status */}
                  <div className="mb-3 flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Day {day}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        dayStatus === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : dayStatus === "today"
                            ? "bg-violet-100 text-violet-700"
                            : dayStatus === "skipped"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {dayStatus === "completed"
                        ? "Completed ✓"
                        : dayStatus === "today"
                          ? "Today"
                          : dayStatus === "skipped"
                            ? "Skipped"
                            : "Upcoming"}
                    </span>
                  </div>

                  {log ? (
                    <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      {/* Log Header */}
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
                              📝
                            </div>

                            <h3 className="font-bold text-slate-800">
                              Day {log.day}
                            </h3>
                          </div>

                          <p className="mt-2 text-sm text-slate-500">
                            {new Date(log.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        {/* Actual Value */}
                        <div className="rounded-xl bg-blue-50 px-4 py-2 text-right">
                          <p className="text-xs font-medium text-blue-500">
                            Practice
                          </p>

                          <p className="mt-0.5 text-lg font-bold text-blue-600">
                            {log.actualValue} {progress.targetUnit}
                          </p>
                        </div>
                      </div>

                      {/* Notes */}
                      {log.notes && (
                        <div className="mt-5 rounded-xl bg-amber-50 p-4">
                          <p className="text-xs font-semibold text-amber-600">
                            Your note
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {log.notes}
                          </p>
                        </div>
                      )}

                      {/* Performance Score */}
                      {log.performanceScore !== undefined && (
                        <div className="mt-5 flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3">
                          <span className="text-sm font-medium text-violet-600">
                            Performance Score
                          </span>

                          <span className="text-xl font-bold text-violet-700">
                            {log.performanceScore}
                          </span>
                        </div>
                      )}

                      {/* AI Verification */}
                      {log.verification && (
                        <div
                          className={`mt-6 rounded-2xl border p-5 ${
                            log.verification.status === "consistent"
                              ? "border-violet-100 bg-violet-50/60"
                              : log.verification.status ===
                                  "partially_consistent"
                                ? "border-amber-100 bg-amber-50/60"
                                : log.verification.status === "unclear"
                                  ? "border-orange-100 bg-orange-50/60"
                                  : "border-rose-100 bg-rose-50/60"
                          }`}
                        >
                          {/* AI Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                                🤖
                              </div>

                              <div>
                                <h4 className="font-bold text-slate-800">
                                  AI Verification
                                </h4>

                                <p className="text-xs text-slate-500">
                                  Evidence analysis
                                </p>
                              </div>
                            </div>

                            {/* Status */}
                            <span
                              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
                                log.verification.status === "consistent"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : log.verification.status ===
                                      "partially_consistent"
                                    ? "bg-amber-100 text-amber-700"
                                    : log.verification.status === "unclear"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {log.verification.status === "consistent"
                                ? "✓ Evidence Consistent"
                                : log.verification.status ===
                                    "partially_consistent"
                                  ? "⚠ Partially Consistent"
                                  : log.verification.status === "unclear"
                                    ? "? Evidence Unclear"
                                    : "✕ Evidence Inconsistent"}
                            </span>
                          </div>

                          {/* AI Confidence */}
                          <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-sky-700">
                                AI Confidence
                              </span>

                              <span className="font-bold text-slate-700">
                                {Math.round(log.verification.confidence * 100)}%
                              </span>
                            </div>

                            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-sky-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400 transition-all duration-700"
                                style={{
                                  width: `${log.verification.confidence * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Evidence Checks */}
                          <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {/* Activity Match */}
                            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🎯</span>

                                <p className="text-sm font-semibold text-slate-600">
                                  Activity Match
                                </p>
                              </div>

                              <p
                                className={`mt-2 font-bold ${
                                  log.verification.activityMatch
                                    ? "text-emerald-600"
                                    : "text-rose-500"
                                }`}
                              >
                                {log.verification.activityMatch
                                  ? "✓ Activity matches"
                                  : "✕ Activity does not match"}
                              </p>
                            </div>

                            {/* Duration Match */}
                            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">⏱️</span>

                                <p className="text-sm font-semibold text-slate-600">
                                  Duration Match
                                </p>
                              </div>

                              <p
                                className={`mt-2 font-bold ${
                                  log.verification.durationMatch
                                    ? "text-emerald-600"
                                    : "text-rose-500"
                                }`}
                              >
                                {log.verification.durationMatch
                                  ? "✓ Duration matches"
                                  : "✕ Duration does not match"}
                              </p>
                            </div>
                          </div>

                          {/* What AI Observed */}
                          {(log.verification.observedActivity ||
                            log.verification.observedDuration) && (
                            <div className="mt-5 rounded-xl border border-slate-100 bg-white p-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🔍</span>

                                <p className="text-sm font-bold text-slate-700">
                                  What AI Observed
                                </p>
                              </div>

                              {log.verification.observedActivity && (
                                <div className="mt-4">
                                  <p className="text-xs font-medium text-slate-400">
                                    Activity
                                  </p>

                                  <p className="mt-1 text-sm font-medium leading-6 text-slate-700">
                                    {log.verification.observedActivity}
                                  </p>
                                </div>
                              )}

                              {log.verification.observedDuration && (
                                <div className="mt-4">
                                  <p className="text-xs font-medium text-slate-400">
                                    Duration
                                  </p>

                                  <p className="mt-1 text-sm font-medium text-slate-700">
                                    {log.verification.observedDuration}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* AI Summary */}
                          {log.verification.summary && (
                            <div className="mt-5 rounded-xl bg-white/80 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-violet-500">
                                AI Summary
                              </p>

                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {log.verification.summary}
                              </p>
                            </div>
                          )}

                          {/* Limitations */}
                          {log.verification.limitations?.length > 0 && (
                            <div className="mt-5 rounded-xl bg-white/80 p-4">
                              <p className="text-sm font-bold text-slate-700">
                                Limitations
                              </p>

                              <ul className="mt-2 space-y-2 text-sm text-slate-500">
                                {log.verification.limitations.map(
                                  (limitation, index) => (
                                    <li
                                      key={index}
                                      className="flex gap-2 leading-5"
                                    >
                                      <span className="text-violet-400">•</span>

                                      <span>{limitation}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Proof */}
                      {(log.attachments || []).length > 0 && (
                        <div className="mt-6">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-lg">📎</span>

                            <h4 className="text-sm font-bold text-slate-700">
                              Proof
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {log.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="overflow-hidden rounded-xl border border-violet-100 bg-violet-50 p-1 shadow-sm"
                              >
                                {attachment.type === "image" && (
                                  <img
                                    src={`${import.meta.env.VITE_API_URL}${attachment.url}`}
                                    alt={`Proof ${index + 1}`}
                                    className="h-36 w-36 rounded-lg object-cover transition duration-200 hover:scale-[1.02]"
                                  />
                                )}

                                {attachment.type === "video" && (
                                  <video
                                    src={`${import.meta.env.VITE_API_URL}${attachment.url}`}
                                    controls
                                    className="h-36 w-64 rounded-lg object-cover"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Not Logged */
                    <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                          🌸
                        </div>

                        <div>
                          <p className="font-semibold text-slate-700">
                            Day {day}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Not logged yet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExperimentDetails;
