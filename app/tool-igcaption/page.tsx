"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const suggestions = [
  "Write a caption for a skincare reel targeting Gen Z",
  "Create a carousel caption about self-care for small business owners",
  "Hook for a tech startup ad post",
  "Funny caption for a product launch",
  "Caption for a motivational Monday reel"
];

export default function ToolIGCaption() {
  const [input, setInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Yo! What kind of Instagram caption do you need help with today?"
    }
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
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/igcaption", {
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
      <aside className="w-16 bg-[#111] border-r border-gray-800 flex flex-col items-center py-6 space-y-6">
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

      {/* Main */}
      <main className="flex-1 p-6 flex flex-col items-center overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1">📱 Instagram Caption Generator</h1>
          <p className="text-gray-400 text-sm">
            Tell me what you’re posting about — I’ll write a scroll-stopping caption.
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 w-full max-w-3xl overflow-y-auto bg-[#111] rounded-lg p-4 space-y-3 border border-gray-800 shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`relative text-sm w-fit max-w-[80%] px-4 py-3 rounded-lg ${
                msg.sender === "user"
                  ? "ml-auto bg-gradient-to-r from-pink-500 to-purple-500"
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={suggestions[placeholderIndex]}
            className="flex-grow px-4 py-3 rounded-xl bg-[#222] text-white placeholder-gray-500 border border-gray-700 focus:border-pink-500 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}
