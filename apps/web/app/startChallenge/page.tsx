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
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Start a New Challenge</h1>
            
            {error && <p className="text-red-500 mb-2">{error}</p>}
            
            <label className="block mb-2">Challenge Name</label>
            <input
                type="text"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-black"
            />

            <label className="block mb-2">Goal Type</label>
            <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-black"
            >
                <option value="custom">Custom Challenge</option>
                <option value="steps">Steps</option>
                <option value="calories">Calories Burned</option>
                <option value="distance">Distance (km)</option>
                <option value="activeMinutes">Active Minutes</option>
            </select>

            {goalType === "custom" && (
                <>
                    <label className="block mb-2">Describe Your Challenge</label>
                    <input
                        type="text"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        className="w-full p-2 mb-4 border rounded text-black"
                        placeholder="e.g. 100 Pushups Challenge"
                    />
                </>
            )}

            <label className="block mb-2">Target Value</label>
            <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-black"
            />

            <label className="block mb-2">Duration (Days)</label>
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-black"
            />

            <button
                onClick={handleCreateChallenge}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Challenge
            </button>
        </div>
    );
};

export default StartChallenge;