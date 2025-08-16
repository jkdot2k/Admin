import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hardcoded credentials (simulate backend)
  const ADMIN_EMAIL = "admin@email.com";
  const ADMIN_PASS = "admin123";

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      // Simulate JWT token
      const fakeToken = "fake-jwt-token-12345";
      setToken(fakeToken);
      localStorage.setItem("authToken", fakeToken);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-900 transition"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          Demo: <b>{ADMIN_EMAIL}</b> / <b>{ADMIN_PASS}</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
