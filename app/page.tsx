"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const testimonials = [
  { name: "Lina M.", quote: "Starterly gave my hustle real structure — it's crazy how fast I got responses!" },
  { name: "James A.", quote: "Within 2 days of trying the cold email tool, I landed my first international client." },
  { name: "Amina K.", quote: "As a solo founder, Starterly is like hiring a full-time growth team." },
  { name: "Carlos E.", quote: "I paid once and used it to create captions, brand kit, AND landing page. 10/10." }
];

const tools = [
  { emoji: "📧", name: "Cold Email Generator", description: "Craft high-return cold emails effortlessly." },
  { emoji: "📄", name: "Proposal Generator", description: "Get investor or client-ready proposals in seconds." },
  { emoji: "🎨", name: "Brand Kit Builder", description: "Instantly generate logos, names, slogans & palettes." },
  { emoji: "📱", name: "IG Caption AI", description: "Scroll-stopping captions for Reels and carousels." },
  { emoji: "🌐", name: "Landing Page Writer", description: "Convert clicks with high-performance copy." }
];

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[(slideIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[slideIndex],
    testimonials[(slideIndex + 1) % testimonials.length]
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="bg-white text-black px-2 py-1 rounded">S.</span>
          Starterly
        </div>
        <nav className="space-x-4 text-sm">
          <Link href="/login" className="text-gray-300 hover:text-white">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <style jsx global>{`
  body {
    background: black;
    overflow-x: hidden;
  }

  .pulse-background {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: pulse 3s infinite ease-in-out;
    z-index: -1;
    filter: blur(100px);
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.15);
      opacity: 0.3;
    }
  }
`}</style>

<div className="pulse-background" />

      {/* Hero */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Turn Ideas Into Income.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-6">
          AI-powered assistants built for freelancers, solopreneurs, and side-hustlers.
          <br /> No coding. No monthly fees. Just results.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-4 bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Tool Showcase */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 p-6 rounded-xl text-center hover:shadow-lg hover:border-blue-500 transition"
            >
              <div className="text-3xl mb-2">{tool.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-400">{tool.description}</p>
              <Link href="/login" className="block mt-4 text-sm text-blue-500 hover:underline">
                Try Now →
              </Link>
            </div>
          ))}
        </div>
      </section>
<section className="px-6 py-20 bg-[#0d0d0d] border-t border-gray-800">
  <h2 className="text-3xl font-bold text-center mb-12">Why Starterly Stands Out 💡</h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        title: "All-in-One Growth Toolkit",
        desc: "Everything you need — cold emails, captions, proposals, branding, and pages — in one place."
      },
      {
        title: "Pay Once, Use Forever",
        desc: "No monthly subscriptions. Buy once, get lifetime access to all tools. No hidden fees."
      },
      {
        title: "AI Built for Business Results",
        desc: "Not just content — our AI is optimized for real-world conversions and lead gen."
      },
      {
        title: "Blazing Fast & Lightweight",
        desc: "Starterly loads fast, works offline, and doesn't bloat your workflow with distractions."
      },
      {
        title: "For Hustlers, by a Hustler",
        desc: "Built with heart by someone who knows the grind — not a faceless corporation."
      },
      {
        title: "Future-Proof & Evolving",
        desc: "New tools, integrations, and upgrades constantly added without extra cost."
      }
    ].map((item, i) => (
      <div key={i} className="bg-[#111] p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
        <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-b border-gray-800">
        <h2 className="text-center text-3xl font-bold mb-10">What users are saying</h2>
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out space-x-6">
            {visibleTestimonials.map((t, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-full md:w-1/3 p-4 rounded-xl bg-[#1a1a1a] border border-gray-700 transition-opacity ${
                  idx === 1 ? "opacity-100 scale-100" : "opacity-50 scale-95"
                }`}
              >
                <p className="text-sm text-gray-300 italic">“{t.quote}”</p>
                <p className="mt-2 text-sm font-semibold text-white">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center text-sm text-gray-500 py-8 border-t border-gray-800">
        © {new Date().getFullYear()} Starterly — Built for the bold.
      </footer>
    </div>
  );
}
