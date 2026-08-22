import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        "http://localhost:3000/api/auth/login",
        options,
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        return;
      }

      localStorage.setItem("token", data.token);

      console.log("Login Successful!");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-2xi font-bold">Login to ProofLoop</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rouded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
