"use client";

import { useState } from "react";

const dummyChallenges = [
  { id: 1, name: "10,000 Steps Daily", type: "Steps", participants: 120 },
  { id: 2, name: "500 Calories Burn", type: "Calories", participants: 80 },
  { id: 3, name: "5KM Run Challenge", type: "Distance", participants: 60 },
];

const LiveSessions = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    if (!joinedChallenges.includes(id)) {
      setJoinedChallenges([...joinedChallenges, id]);
      alert(`You have joined the challenge!`);
    }
  };

  return (
    <div className="grid gap-6">
      {dummyChallenges.map((challenge) => (
        <div key={challenge.id} className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-bold text-blue-300">{challenge.name}</h2>
          <p className="text-gray-400">Type: {challenge.type}</p>
          <p className="text-gray-500">Participants: {challenge.participants}</p>

          <button
            onClick={() => handleJoin(challenge.id)}
            disabled={joinedChallenges.includes(challenge.id)}
            className={`mt-4 px-4 py-2 rounded-lg font-bold text-white ${
              joinedChallenges.includes(challenge.id)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {joinedChallenges.includes(challenge.id) ? "Joined" : "Join Challenge"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LiveSessions;
