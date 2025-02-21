"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const dummyChallenges = [
  {
    id: 1,
    challengeName: "🔥 10,000 Steps Daily",
    createdBy: "John Doe",
    goalType: "Steps",
    targetValue: 10000,
    duration: 7,
    participants: 320,
  },
  {
    id: 2,
    challengeName: "🏋️ 500 Calories Burn",
    createdBy: "Jane Smith",
    goalType: "Calories",
    targetValue: 500,
    duration: 5,
    participants: 180,
  },
  {
    id: 3,
    challengeName: "🏃‍♂️ 5KM Run Challenge",
    createdBy: "Alice Brown",
    goalType: "Distance",
    targetValue: 5,
    duration: 10,
    participants: 250,
  },
];

const LiveChallenges = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    if (!joinedChallenges.includes(id)) {
      setJoinedChallenges([...joinedChallenges, id]);
      alert(`🎉 You have joined the challenge!`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-20">
        <h2 className="text-2xl font-bold">Live Workout</h2>
        <Button
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
      onClick={() => window.location.href = "http://localhost:3000/startChallenge"}
    >
      Start New Challenge
    </Button>

      </div>
      
      {/* Spacer to offset fixed header */}
      <div className="h-24"></div>

      {/* Challenges Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {dummyChallenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg text-center"
          >
            <h2 className="text-2xl font-extrabold text-blue-400">{challenge.challengeName}</h2>
            <p className="text-lg font-semibold text-purple-300 mt-1">Created by: {challenge.createdBy}</p>
            <p className="text-gray-400 text-sm mt-2">Goal Type: {challenge.goalType}</p>
            <p className="text-gray-500 mt-1">Target: {challenge.targetValue} {challenge.goalType === "Steps" ? "steps" : challenge.goalType.toLowerCase()}</p>
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
        ))}
      </motion.div>
    </div>
  );
};

export default LiveChallenges;
