"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import api from "@/lib/api-client"; // Import the axios instance

interface ChallengeData {
    title: string;
    description: string;
    goal_type: "steps" | "calories" | "distance" | "activeMinutes" | "custom";
    goal_value: number;
    duration: number;
    start_date?: string;
    end_date?: string;
    reward_points?: number;
    invited_users?: string[];
}

const StartChallenge = () => {
    const router = useRouter(); // Initialize router
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goalType, setGoalType] = useState<ChallengeData["goal_type"]>("custom");
    const [customGoal, setCustomGoal] = useState("");
    const [goalValue, setGoalValue] = useState("");
    const [duration, setDuration] = useState("7");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateChallenge = async () => {
        setError("");
        setLoading(true);

        try {
            if (!title || !goalValue || !duration || (goalType === "custom" && !customGoal)) {
                setError("All fields are required.");
                setLoading(false);
                return;
            }

            const challengeData = {
                title,
                description: description || `A challenge to achieve ${goalValue} in ${duration} days`,
                goal_type: goalType === "custom" ? customGoal : goalType,
                goal_value: parseFloat(goalValue),
                duration: parseInt(duration),
                start_date: new Date().toISOString(),
            };

            console.log("Sending Challenge Data:", challengeData);

            const response = await api.post("/v1/challenge/create", challengeData);

            console.log("Challenge Created Successfully:", response.data);
            
            // Redirect to the previous page
            router.back(); 

        } catch (err: any) {
            console.error("Error creating challenge:", err);

            if (err.response) {
                console.error("API Response:", err.response.data);
                setError(err.response.data?.message || "Something went wrong.");
            } else {
                setError("Network error or server is down.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Start a New Challenge</h1>
            {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

            <label className="block mb-2 font-medium">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" />

            <label className="block mb-2 font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" />

            <label className="block mb-2 font-medium">Goal Type</label>
            <select value={goalType} onChange={(e) => setGoalType(e.target.value as ChallengeData["goal_type"])}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500">
                <option value="custom">Custom Challenge</option>
                <option value="steps">Steps</option>
                <option value="calories">Calories Burned</option>
                <option value="distance">Distance (km)</option>
                <option value="activeMinutes">Active Minutes</option>
            </select>

            {goalType === "custom" && (
                <>
                    <label className="block mb-2 font-medium">Describe Your Challenge</label>
                    <input type="text" value={customGoal} onChange={(e) => setCustomGoal(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 100 Pushups Challenge" />
                </>
            )}

            <label className="block mb-2 font-medium">Goal Value</label>
            <input type="number" value={goalValue} onChange={(e) => setGoalValue(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" />

            <label className="block mb-2 font-medium">Duration (Days)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" />

            <button onClick={handleCreateChallenge} disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                {loading ? "Creating..." : "Create Challenge"}
            </button>
        </div>
    );
};

export default StartChallenge;
