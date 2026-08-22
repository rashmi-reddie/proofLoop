import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-tight"
          >
            Proof<span className="text-violet-400">Loop</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center lg:px-8 lg:pb-28 lg:pt-32">
            {/* Small badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Turn progress into proof
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Turn your goals into{" "}
              <span className="text-violet-400">measurable experiments.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              ProofLoop helps you run experiments, track daily progress, attach
              real evidence, and understand what is actually working.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/register")}
                className="rounded-xl bg-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500"
              >
                Start Your First Experiment →
              </button>

              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-white/10"
              >
                I already have an account
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                How ProofLoop works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Don't just set goals. Prove your progress.
              </h2>

              <p className="mt-4 text-slate-400">
                Turn an idea into an experiment, collect evidence as you go, and
                use your results to make better decisions.
              </p>
            </div>

            {/* Feature cards */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-400/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                  🎯
                </div>

                <h3 className="text-xl font-semibold">Run Experiments</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  Define what you want to achieve, set measurable targets, and
                  give each experiment a clear timeframe.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-400/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                  📸
                </div>

                <h3 className="text-xl font-semibold">Track Real Evidence</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  Record daily results and attach screenshots, images, or videos
                  so your progress is backed by evidence.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-400/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                  ✨
                </div>

                <h3 className="text-xl font-semibold">Get AI Insights</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  Analyze your experiment data and discover patterns that can
                  help you understand your progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Stop guessing. Start proving.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Start your first experiment and turn your progress into something
              you can actually measure.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-8 rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get Started →
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} ProofLoop</p>

          <p>Track it. Prove it. Improve it.</p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
