"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] rounded-2xl p-8 shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">Log in to Starterly</h1>

        <form onSubmit={handleLogin} className="space-y-5 relative">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-white text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
