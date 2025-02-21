"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import api from "@/lib/api-client"; // Import the axios instance


const LiveChallenges = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get("/v1/challenge/user-challenges");
        console.log("response: " , response);
        
        if (!response.ok) throw new Error("Failed to fetch challenges");
        const data = await response.json();
        setChallenges(data.challenges);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleJoin = (id: number) => {
    if (!joinedChallenges.includes(id)) {
      setJoinedChallenges([...joinedChallenges, id]);
      alert(`🎉 You have joined the challenge!`);
    }
  };

  if (loading) return <p className="text-center text-white">Loading challenges...</p>;
  // /if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-20">
        <h2 className="text-2xl font-bold">Live Challenges</h2>
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          onClick={() => window.location.href = "/startChallenge"}
        >
          Start New Challenge
        </Button>
      </div>

      <div className="h-24"></div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {challenges.length === 0 ? (
          <p className="text-center text-gray-400">No live challenges available.</p>
        ) : (
          challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg text-center"
            >
              <h2 className="text-2xl font-extrabold text-blue-400">{challenge.title}</h2>
              <p className="text-lg font-semibold text-purple-300 mt-1">Created by: {challenge.createdBy}</p>
              <p className="text-gray-400 text-sm mt-2">Goal Type: {challenge.type}</p>
              <p className="text-gray-500 mt-1">Target: {challenge.goal} {challenge.type === "Steps" ? "steps" : challenge.type.toLowerCase()}</p>
              <p className="text-gray-500 mt-1">Duration: {challenge.duration} Days</p>
              <p className="text-gray-500 mt-1">Participants: {challenge.participants} 🏅</p>

              <button
                onClick={() => handleJoin(challenge.id)}
                disabled={joinedChallenges.includes(challenge.id)}
                className={`mt-5 px-5 py-2 rounded-lg font-bold text-white transition-all duration-300 ${
                  joinedChallenges.includes(challenge.id)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:to-blue-700"
                }`}
              >
                {joinedChallenges.includes(challenge.id) ? "✅ Joined" : "Join Challenge 🚀"}
              </button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LiveChallenges;
