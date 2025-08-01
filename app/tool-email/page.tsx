"use client";


import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const suggestions = [
  "Write a cold email for a digital marketing agency",
  "Create an outreach email for a new freelancer",
  "Pitch my design services to startups",
  "Follow up with a lead who didn’t respond",
  "Email for introducing my brand to a small business"
];

export default function ToolEmail() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hey! What kind of email would you like me to write today?" }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "ai", text: data.output }]);
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      {/* Sidebar Desktop */}
{/* Desktop Sidebar */}
<aside className="hidden md:flex w-16 bg-[#111] border-r border-gray-800 flex-col items-center py-6 space-y-6">
  {[
    { icon: "📧", href: "/tool-email" },
    { icon: "📄", href: "/tool-proposal" },
    { icon: "🎨", href: "/tool-brandkit" },
    { icon: "📱", href: "/tool-igcaption" },
    { icon: "🌐", href: "/tool-landingpage" }
  ].map((item, i) => (
    <Link key={i} href={item.href}>
      <span className="text-2xl hover:scale-110 transition">{item.icon}</span>
    </Link>
  ))}
</aside>

{/* Mobile Menu */}
<div className="md:hidden fixed top-4 left-4 z-50">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-white text-3xl px-3 py-2 rounded bg-[#111] border border-gray-700"
  >
    ☰
  </button>

  {menuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-start pt-24 space-y-6">
      {[
        { label: "Cold Email", icon: "📧", href: "/tool-email" },
        { label: "Proposal", icon: "📄", href: "/tool-proposal" },
        { label: "Brand Kit", icon: "🎨", href: "/tool-brandkit" },
        { label: "IG Captions", icon: "📱", href: "/tool-igcaption" },
        { label: "Landing Page", icon: "🌐", href: "/tool-landingpage" }
      ].map((item, i) => (
        <Link key={i} href={item.href}>
          <div
            onClick={() => setMenuOpen(false)}
            className="w-4/5 py-3 px-6 text-lg rounded-xl flex items-center gap-4 bg-[#1a1a1a] hover:bg-gray-800 text-white border border-gray-700"
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>



      {/* Main Area */}
      <main className="flex-1 p-6 flex flex-col items-center overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1">📧 Cold Email Generator</h1>
          <p className="text-gray-400 text-sm">
            Describe your offer and I’ll write a cold email for you instantly.
          </p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 w-full max-w-3xl overflow-y-auto bg-[#111] rounded-lg p-4 space-y-3 border border-gray-800 shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`relative text-sm w-fit max-w-[80%] px-4 py-3 rounded-lg ${
                msg.sender === "user"
                  ? "ml-auto bg-gradient-to-r from-indigo-600 to-purple-500"
                  : "bg-gray-800"
              }`}
            >
              {msg.text}
              {msg.sender === "ai" && (
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="absolute top-1 right-2 text-xs text-gray-400 hover:text-white"
                  title="Copy to clipboard"
                >
                  
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="w-full max-w-3xl mt-6 flex gap-2">
          <input
            type="text"
            value={input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            onChange={(e) => setInput(e.target.value)}
            placeholder={suggestions[placeholderIndex]}
            className="flex-grow px-4 py-3 rounded-xl bg-[#222] text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 outline-none"
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-white/20 transition"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}
