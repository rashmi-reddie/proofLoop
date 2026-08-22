import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsRegistering(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        options,
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage(data.message || "Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.log(err);
      setError("Unable to connect to server");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      {/* Back to home */}
      <button
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        ← Back to ProofLoop
      </button>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold tracking-tight"
          >
            Proof<span className="text-violet-400">Loop</span>
          </button>

          <p className="mt-3 text-sm text-slate-400">
            Turn your goals into measurable experiments.
          </p>
        </div>

        {/* Register Card */}
        <form
          onSubmit={handleRegister}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Start tracking your progress with ProofLoop.
            </p>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-violet-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-violet-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-20 text-white placeholder-slate-500 outline-none transition focus:border-violet-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 transition hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {message}
              <p className="mt-1 text-xs text-emerald-400">
                Redirecting you to login...
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isRegistering}
            className="w-full rounded-xl bg-violet-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRegistering ? "Creating account..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
