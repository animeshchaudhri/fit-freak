"use client";

import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const clientId = "540804758883-9hic46lqatf6h57ju6memo3bb0fbkvk6.apps.googleusercontent.com";

const GoogleFitComponent = ({ onDataFetched }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const fetchAllFitnessData = async (accessToken) => {
        setIsLoading(true);
        try {
            // Fetch steps data
            const stepsResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 7 * 86400000,
                    endTimeMillis: Date.now(),
                }),
            });

            // Fetch calories data
            const caloriesResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    aggregateBy: [{ dataTypeName: "com.google.calories.expended" }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 7 * 86400000,
                    endTimeMillis: Date.now(),
                }),
            });

            // Fetch distance data
            const distanceResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    aggregateBy: [{ dataTypeName: "com.google.distance.delta" }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 7 * 86400000,
                    endTimeMillis: Date.now(),
                }),
            });

            // Fetch active minutes data
            const activeMinutesResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    aggregateBy: [{ dataTypeName: "com.google.activity.segment" }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 7 * 86400000,
                    endTimeMillis: Date.now(),
                }),
            });

            // Fetch heart rate data
            const heartRateResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    aggregateBy: [{ dataTypeName: "com.google.heart_rate.bpm" }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 7 * 86400000,
                    endTimeMillis: Date.now(),
                }),
            });

            // Process all responses
            const stepsData = await stepsResponse.json();
            const caloriesData = await caloriesResponse.json();
            const distanceData = await distanceResponse.json();
            const activeMinutesData = await activeMinutesResponse.json();
            const heartRateData = await heartRateResponse.json();

            // Combine all data
            const combinedData = {
                steps: stepsData,
                calories: caloriesData,
                distance: distanceData,
                activeMinutes: activeMinutesData,
                heartRate: heartRateData
            };

            setIsConnected(true);
            onDataFetched(combinedData);
        } catch (error) {
            console.error("Error fetching Google Fit data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read",
        flow: "implicit",
        onSuccess: async (response) => {
            await fetchAllFitnessData(response.access_token);
        },
        onError: () => console.log("Login Failed"),
    });

    return (
        <div className="mb-6">
            <Button 
                onClick={handleLogin} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Fetching Data...
                    </>
                ) : isConnected ? (
                    "Refresh Google Fit Data"
                ) : (
                    "Connect Google Fit"
                )}
            </Button>
        </div>
    );
};

const GoogleFitApp = ({ onDataFetched }) => (
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleFitComponent onDataFetched={onDataFetched} />
    </GoogleOAuthProvider>
);

export default GoogleFitApp;