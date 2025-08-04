"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isSubscribed = false;
  const remainingCredits = 1;

  const tools = [
    { name: "Cold Email", emoji: "📧", href: "/tool-email" },
    { name: "Proposal", emoji: "📄", href: "/tool-proposal" },
    { name: "Brand Kit", emoji: "🎨", href: "/tool-brandkit" },
    { name: "IG Captions", emoji: "📱", href: "/tool-igcaption" },
    { name: "Landing Page", emoji: "🌐", href: "/tool-landingpage" },
  ];

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleUpdateEmail = async () => {
    const newEmail = prompt("Enter new email:");
    if (newEmail) {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) alert(error.message);
      else alert("Email updated successfully!");
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) alert(error.message);
      else alert("Password changed!");
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

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
          <p><span className="text-gray-400">Name:</span> {user?.user_metadata?.name || "N/A"}</p>
          <p><span className="text-gray-400">Email:</span> {user?.email}</p>
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
                      <a href={tool.href} className="text-sm text-blue-500 hover:underline">
                        Open
                      </a>
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
            <li className="hover:text-white cursor-pointer" onClick={handleChangePassword}>
              Change password
            </li>
            <li className="hover:text-white cursor-pointer" onClick={handleUpdateEmail}>
              Update email
            </li>
            <li className="hover:text-white cursor-not-allowed opacity-50">
              Manage notifications (coming soon)
            </li>
            <li className="hover:text-white cursor-pointer text-red-500" onClick={handleLogout}>
              Log out
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
