"use client";

import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const clientId = "540804758883-9hic46lqatf6h57ju6memo3bb0fbkvk6.apps.googleusercontent.com";

const GoogleFitComponent = () => {
    const [stepData, setStepData] = useState(null);

    const handleLogin = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/fitness.activity.read",
        flow: "implicit",
        onSuccess: async (response) => {
            try {
                const accessToken = response.access_token; // Correct access token

                const googleFitResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
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

                if (!googleFitResponse.ok) {
                    throw new Error("Failed to fetch Google Fit data");
                }

                const data = await googleFitResponse.json();
                setStepData(data);
            } catch (error) {
                console.error("Error fetching Google Fit data:", error);
            }
        },
        onError: () => console.log("Login Failed"),
    });

    return (
        <div>
            <h1>Google Fit Data</h1>
            <button onClick={() => handleLogin()}>Sign in with Google</button>

            {stepData && (
                <div>
                    <h2>Steps Data</h2>
                    <pre>{JSON.stringify(stepData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

// Wrap the entire component in GoogleOAuthProvider
const GoogleFitApp = () => (
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleFitComponent />
    </GoogleOAuthProvider>
);

export default GoogleFitApp;
