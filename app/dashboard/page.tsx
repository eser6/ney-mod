"use client";

import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const isSubscribed = false; // Replace this later with auth/payment logic
  const remainingCredits = 1; // E.g. max 2 per 24hr for free users

  const tools = [
    { name: "Cold Email", emoji: "📧", href: "/tool-email" },
    { name: "Proposal", emoji: "📄", href: "/tool-proposal" },
    { name: "Brand Kit", emoji: "🎨", href: "/tool-brandkit" },
    { name: "IG Captions", emoji: "📱", href: "/tool-igcaption" },
    { name: "Landing Page", emoji: "🌐", href: "/tool-landingpage" }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Starterly ⚡</h1>
          <p className="text-gray-400 mt-2 text-sm">Your AI toolkit for smart business growth</p>
        </header>

        {/* Account Info */}
        <section className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">👤 Account</h2>
          <p><span className="text-gray-400">Email:</span> johndoe@example.com</p>
          <p><span className="text-gray-400">Plan:</span> {isSubscribed ? "Premium 🔥" : "Free 🧊"}</p>
          {!isSubscribed && (
            <p className="mt-2 text-yellow-400 text-sm">
              You have <strong>{remainingCredits}</strong> free use left today. 
              Upgrade to unlock full access.
            </p>
          )}
        </section>

        {/* Tools */}
        <section className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🧠 Your Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool, index) => {
              const isLocked = !isSubscribed && index > 0;
              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl border ${
                    isLocked
                      ? "border-gray-700 bg-[#1a1a1a] opacity-40 cursor-not-allowed"
                      : "border-gray-700 bg-[#1a1a1a] hover:border-blue-500 hover:shadow-blue-500/10 transition"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{tool.emoji}</span>
                    {!isLocked ? (
                      <Link href={tool.href} className="text-sm text-blue-500 hover:underline">
                        Open
                      </Link>
                    ) : (
                      <span className="text-xs text-red-400">Premium</span>
                    )}
                  </div>
                  <p className="text-lg font-medium">{tool.name}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Settings */}
        <section className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">⚙️ Settings</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Change password</li>
            <li className="hover:text-white cursor-pointer">Update email</li>
            <li className="hover:text-white cursor-pointer">Manage notifications</li>
            <li className="hover:text-white cursor-pointer text-red-500">Log out</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
