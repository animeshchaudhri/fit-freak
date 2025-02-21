"use client";

import LiveSessions from "@/components/LiveSessions";

export default function LivePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-400">
        Live Challenges
      </h1>
      <LiveSessions />
    </div>
  );
}
