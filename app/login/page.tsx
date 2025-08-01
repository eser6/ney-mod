"use client";

import Link from "next/link";
import { useState } from "react";
import Dashboard from "../dashboard/page";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] rounded-2xl p-8 shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 Log in to Starterly</h1>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <Link href="/dashboard"
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition"
          >
            Log In
          </Link>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
