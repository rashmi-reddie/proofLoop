import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateExperiment = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyTarget, setDailyTarget] = useState("");
  const [targetUnit, setTargetUnit] = useState("");
  const [baseline, setBaseline] = useState("");
  const [prediction, setPrediction] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          startDate,
          endDate,
          dailyTarget: Number(dailyTarget),
          baseline: Number(baseline),
          prediction: Number(prediction),
          targetUnit,
        }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/experiments`,
        options,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create experiment");
      }

      navigate("/dashboard");

      setMessage(data.message);
      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setStartDate("");
      setEndDate("");
      setDailyTarget("");
      setTargetUnit("");
      setBaseline("");
      setPrediction("");
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-violet-200 px-4 py-10 sm:px-6 lg:px-8">
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-xl">
              🧪
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Create Experiment
            </h1>
          </div>

          <p className="text-slate-500">
            Define what you want to improve and how you'll measure it. ✨
          </p>
        </div>

        {/* Form Card */}
        <form
          className="space-y-7 rounded-3xl bg-white p-6 shadow-sm sm:p-8"
          onSubmit={handleSubmit}
        >
          {/* Basic Information */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                📝
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Basic Information
                </h2>

                <p className="text-xs text-slate-500">
                  What are you trying to improve?
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Experiment Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="30 Day English Speaking"
                className="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Speak English for one hour every day"
                rows="4"
                className="w-full resize-none rounded-xl border border-pink-100 bg-pink-50/30 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
              />
            </div>

            {/* Category */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Communication"
                className="w-full rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-slate-100 pt-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100">
                📅
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Experiment Timeline
                </h2>

                <p className="text-xs text-slate-500">
                  Decide when your experiment starts and ends.
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End Date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          {/* Daily Target */}
          <div className="border-t border-slate-100 pt-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                🎯
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">Daily Target</h2>

                <p className="text-xs text-slate-500">
                  Define how much you want to practice each day.
                </p>
              </div>
            </div>

            {/* Daily Target + Unit */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Daily Target
                </label>

                <input
                  type="number"
                  value={dailyTarget}
                  onChange={(e) => setDailyTarget(e.target.value)}
                  placeholder="60"
                  className="w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Target Unit
                </label>

                <input
                  type="text"
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value)}
                  placeholder="minutes"
                  className="w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          {/* Measurement */}
          <div className="border-t border-slate-100 pt-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                📊
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">Measurement</h2>

                <p className="text-xs text-slate-500">
                  Set your starting point and expected outcome.
                </p>
              </div>
            </div>

            {/* Baseline + Prediction */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Baseline Score
                </label>

                <input
                  type="number"
                  value={baseline}
                  onChange={(e) => setBaseline(e.target.value)}
                  placeholder="50"
                  className="w-full rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Predicted Score
                </label>

                <input
                  type="number"
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  placeholder="70"
                  className="w-full rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <p className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
              ✓ {message}
            </p>
          )}

          {error && (
            <p className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-600">
              ⚠️ {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-400 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:from-violet-600 hover:to-pink-500 hover:shadow-md"
          >
            🧪 Create Experiment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExperiment;
