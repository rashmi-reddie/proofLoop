import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
        console.log(data.message || "Login failed");
        return;
      }

      // Store JWT token
      localStorage.setItem("token", data.token);

      console.log("Login Successful!");

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          Login to ProofLoop
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
