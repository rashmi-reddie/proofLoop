import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoggingIn(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        options,
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);

      console.log("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Unable to connect to server");
    } finally {
      setIsLoggingIn(false);
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

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Log in to continue tracking your experiments.
            </p>
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
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-xl bg-violet-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
