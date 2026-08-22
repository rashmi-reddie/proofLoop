import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateDailyLog = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [performanceScore, setPerformanceScore] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("day", day);
      formData.append("date", date);
      formData.append("actualValue", actualValue);
      formData.append("performanceScore", performanceScore);
      formData.append("notes", notes);

      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await fetch(
        `http://localhost:3000/api/experiments/${experimentId}/logs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create daily log");
      }

      console.log("Log Created:", data);

      navigate(`/experiments/${experimentId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-violet-200 px-4 py-10 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left */}
        <span className="absolute left-[5%] top-[8%] text-3xl text-black">
          ✦
        </span>

        <span className="absolute left-[14%] top-[18%] text-2xl text-black">
          ✧
        </span>

        <span className="absolute left-[24%] top-[7%] text-xl text-black">
          ✦
        </span>

        <span className="absolute left-[34%] top-[15%] text-2xl text-black">
          ✧
        </span>

        {/* Top Right */}
        <span className="absolute right-[6%] top-[9%] text-3xl text-black">
          ✦
        </span>

        <span className="absolute right-[16%] top-[20%] text-2xl text-black">
          ✧
        </span>

        <span className="absolute right-[27%] top-[7%] text-xl text-black">
          ✦
        </span>

        <span className="absolute right-[38%] top-[16%] text-2xl text-black">
          ✧
        </span>

        {/* Moons - Top */}
        <span className="absolute right-[4%] top-[32%] text-4xl text-black">
          ☾
        </span>

        <span className="absolute left-[3%] top-[38%] text-3xl text-black">
          ☽
        </span>

        {/* Left Side */}
        <span className="absolute left-[7%] top-[45%] text-2xl text-black">
          ✦
        </span>

        <span className="absolute left-[17%] top-[55%] text-xl text-black">
          ✧
        </span>

        <span className="absolute left-[5%] top-[72%] text-3xl text-black">
          ✦
        </span>

        <span className="absolute left-[20%] top-[78%] text-2xl text-black">
          ✧
        </span>

        {/* Right Side */}
        <span className="absolute right-[8%] top-[48%] text-2xl text-black">
          ✧
        </span>

        <span className="absolute right-[19%] top-[58%] text-3xl text-black">
          ✦
        </span>

        <span className="absolute right-[5%] top-[72%] text-2xl text-black">
          ✦
        </span>

        <span className="absolute right-[22%] top-[80%] text-xl text-black">
          ✧
        </span>

        {/* Middle Area - fewer so they don't interfere with the form */}
        <span className="absolute left-[42%] top-[6%] text-xl text-black">
          ✦
        </span>

        <span className="absolute right-[43%] top-[11%] text-lg text-black">
          ✧
        </span>

        <span className="absolute left-[39%] bottom-[8%] text-2xl text-black">
          ✧
        </span>

        <span className="absolute right-[40%] bottom-[12%] text-xl text-black">
          ✦
        </span>

        {/* Bottom Left */}
        <span className="absolute left-[4%] bottom-[15%] text-3xl text-black">
          ☽
        </span>

        <span className="absolute left-[15%] bottom-[7%] text-2xl text-black">
          ✦
        </span>

        <span className="absolute left-[28%] bottom-[17%] text-xl text-black">
          ✧
        </span>

        {/* Bottom Right */}
        <span className="absolute right-[4%] bottom-[13%] text-3xl text-black">
          ☾
        </span>

        <span className="absolute right-[15%] bottom-[6%] text-2xl text-black">
          ✦
        </span>

        <span className="absolute right-[28%] bottom-[18%] text-xl text-black">
          ✧
        </span>

        {/* Small Stars / Dots */}
        <span className="absolute left-[10%] top-[28%] text-lg text-black">
          •
        </span>

        <span className="absolute left-[30%] top-[28%] text-lg text-black">
          •
        </span>

        <span className="absolute right-[11%] top-[25%] text-lg text-black">
          •
        </span>

        <span className="absolute right-[31%] top-[30%] text-lg text-black">
          •
        </span>

        <span className="absolute left-[12%] bottom-[30%] text-lg text-black">
          •
        </span>

        <span className="absolute right-[13%] bottom-[32%] text-lg text-black">
          •
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-xl">
              🌸
            </div>

            <h1 className="text-3xl font-bold text-slate-800">Add Daily Log</h1>
          </div>

          <p className="text-slate-500">
            Record today's practice and performance. ✨
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Day + Date */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Day */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Day
              </label>

              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="1"
                className="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* Actual Practice */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Actual Practice
            </label>

            <div className="relative">
              <input
                type="number"
                value={actualValue}
                onChange={(e) => setActualValue(e.target.value)}
                placeholder="120"
                className="w-full rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 pr-24 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-sky-500">
                minutes
              </span>
            </div>
          </div>

          {/* Performance */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Performance Score
            </label>

            <div className="relative">
              <input
                type="number"
                value={performanceScore}
                onChange={(e) => setPerformanceScore(e.target.value)}
                placeholder="55"
                min="0"
                max="100"
                className="w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 pr-16 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-500">
                / 100
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you practice today?"
              rows="4"
              className="w-full resize-none rounded-xl border border-amber-100 bg-amber-50/30 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
          </div>

          {/* Proof */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Proof
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-6 py-8 text-center transition hover:border-violet-300 hover:bg-violet-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                📎
              </div>

              <p className="mt-3 font-semibold text-slate-700">
                Upload your proof
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Photos, screenshots, or videos
              </p>

              <span className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm">
                Choose Files
              </span>

              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => {
                  setSelectedFiles(Array.from(e.target.files));
                }}
                className="hidden"
              />
            </label>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Selected proof
                </p>

                <div className="mt-3 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      <span className="truncate text-slate-600">
                        {file.name}
                      </span>

                      <span className="ml-3 shrink-0 text-xs font-medium text-violet-500">
                        {file.type.startsWith("video")
                          ? "🎥 Video"
                          : "🖼️ Image"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-2 text-xs text-slate-400">
              Your proof will be analyzed by AI to check whether it supports
              your claimed practice.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
              <span className="text-lg">⚠️</span>

              <p className="text-sm font-medium leading-6 text-rose-600">
                {error}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-400 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:from-violet-600 hover:to-pink-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Analyzing proof...
              </span>
            ) : (
              "✨ Save Log"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateDailyLog;
