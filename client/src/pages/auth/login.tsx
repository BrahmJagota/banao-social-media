import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: LoginData = { email, password };

    try {
      const res = await axiosInstance.post("/auth/login", payload);
      login(res.data.token);
      setMessage("Logged in successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Login failed.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 font-semibold rounded-md transition ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
          )}
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
