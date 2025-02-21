"use client";

import { useState } from "react";

const StartChallenge = () => {
    const [challengeName, setChallengeName] = useState("");
    const [goalType, setGoalType] = useState("custom");
    const [customGoal, setCustomGoal] = useState("");
    const [targetValue, setTargetValue] = useState("");
    const [duration, setDuration] = useState("7");
    const [error, setError] = useState("");

    const handleCreateChallenge = async () => {
        if (!challengeName || !targetValue || !duration || (goalType === "custom" && !customGoal)) {
            setError("All fields are required.");
            return;
        }
        
        const challengeData = {
            challengeName,
            goalType: goalType === "custom" ? customGoal : goalType,
            targetValue: Number(targetValue),
            duration: Number(duration), // Days
        };

        console.log("Creating Challenge:", challengeData);
        // TODO: Send challengeData to backend API
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Start a New Challenge</h1>
            
            {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}
            
            <label className="block mb-2 font-medium">Challenge Name</label>
            <input
                type="text"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Goal Type</label>
            <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
                <option value="custom">Custom Challenge</option>
                <option value="steps">Steps</option>
                <option value="calories">Calories Burned</option>
                <option value="distance">Distance (km)</option>
                <option value="activeMinutes">Active Minutes</option>
            </select>

            {goalType === "custom" && (
                <>
                    <label className="block mb-2 font-medium">Describe Your Challenge</label>
                    <input
                        type="text"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 100 Pushups Challenge"
                    />
                </>
            )}

            <label className="block mb-2 font-medium">Target Value</label>
            <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Duration (Days)</label>
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleCreateChallenge}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
                Create Challenge
            </button>
        </div>
    );
};

export default StartChallenge;
