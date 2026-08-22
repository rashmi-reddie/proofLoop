import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

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
        "http://localhost:3000/api/auth/register",
        options,
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage(data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Unable to connect to server");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Create Account
        </h1>

        <p className="mb-8 text-slate-500">Start your ProofLoop journey</p>

        {/* Name */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Success */}
        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
