/* eslint-disable @typescript-eslint/no-explicit-any */
/* typescript-eslint-disable */
// @ts-nocheck
"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import * as poseDetection from "@tensorflow-models/pose-detection"
import * as tf from "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import "./WorkoutDiv.css"
import { Button } from "../ui/button"
import { ArrowLeft, Loader } from "lucide-react"

export function WorkoutView({ workout, onComplete }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  


  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detector, setDetector] = useState(null);
  const [reps, setReps] = useState(0);
  const repCounted = useRef(false);
  const animationRef = useRef(null);
  
  // Exercise state
  const exercises = ["shoulder_press", "bicep_curl", "lateral_raises", "tricep_dips"];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [exerciseColor, setExerciseColor] = useState("#4361ee");
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [feedback, setFeedback] = useState({ message: "Get ready to start your workout!", type: "default" });
  
  // Get current exercise name
  const currentExercise = exercises[currentExerciseIndex];
  
  // Exercise display names, colors, and instructions
  const exerciseInfo = {
    shoulder_press: { 
      name: "Shoulder Press", 
      color: "#4361ee",
      instructions: "Stand straight with your feet shoulder-width apart. Hold your arms at shoulder height with elbows bent. Push your arms up until they're fully extended, then lower back down to shoulder height.",
      feedback: {
        good: "Great form! Keep pushing upward with controlled movements.",
        needsWork: "Make sure to fully extend your arms upward and keep your back straight."
      }
    },
    bicep_curl: { 
      name: "Bicep Curl", 
      color: "#f72585",
      instructions: "Stand with feet shoulder-width apart, arms extended downward with palms facing forward. Bend at the elbows and curl your hands toward your shoulders, then slowly lower back down.",
      feedback: {
        good: "Excellent control! Keep your elbows close to your body.",
        needsWork: "Try to keep your upper arms stationary and focus on just moving your forearms."
      }
    },
    lateral_raises: { 
      name: "Lateral Raises", 
      color: "#7209b7",
      instructions: "Stand with feet shoulder-width apart, arms at your sides. Keeping your arms straight (slight bend in elbows), raise them out to the sides until they're at shoulder height, then lower slowly.",
      feedback: {
        good: "Perfect height! Keep the movement controlled and steady.",
        needsWork: "Try to raise your arms until they're parallel with the floor, keeping slight bend in elbows."
      }
    },
    tricep_dips: { 
      name: "Tricep Dips", 
      color: "#3a0ca3",
      instructions: "Position your hands on a stable surface (chair/bench) with fingers pointing forward. Bend your elbows to lower your body, then push back up by extending your arms.",
      feedback: {
        good: "Great extension! Keep your back close to the surface.",
        needsWork: "Focus on keeping your elbows pointing backward and use your triceps to push up."
      }
    }
  };

  useEffect(() => {
    const initializeTF = async () => {
      try {
        await tf.setBackend("webgl")
        await tf.ready()
        console.log("TensorFlow.js initialized with backend:", tf.getBackend())
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to initialize TensorFlow:", err)
        setError("Failed to initialize TensorFlow. Please refresh the page.")
        setIsLoading(false)
      }
    }

    initializeTF()
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  }, []);

  useEffect(() => {
    const setupDetector = async () => {
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );
      setDetector(detector);
    };
    
    setupDetector();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      stopCamera(); 
    };
  }, [stopCamera]);

  useEffect(() => {
    if (currentExercise && exerciseInfo[currentExercise]) {
      setExerciseColor(exerciseInfo[currentExercise].color);
      setFeedback({ 
        message: exerciseInfo[currentExercise].instructions, 
        type: "default" 
      });
    }
  }, [currentExercise]);

  useEffect(() => {
    if (reps >= 10) {
       console.log("Audio play error:");
      
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        setWorkoutComplete(true);
        setShowCompletionAnimation(true);
        console.log("Audio play error:", )
        
       
        setTimeout(() => {
          setShowCompletionAnimation(false);
        }, 5000);
      }
      
      setReps(0);
    }
    else if (reps > 0 && reps % 5 === 0) {
      console.log("Audio play error:",);
    }
  }, [reps, currentExerciseIndex, exercises.length]);

  useEffect(() => {
    if (isCameraOn && detector && videoRef.current && videoRef.current.readyState >= 2) {
      detectPose();
    }
  }, [isCameraOn, detector]);

  useEffect(() => {
    // Cleanup function for route changes
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    if (isCameraOn) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        setIsCameraOn(true);
        setFeedback({ 
          message: exerciseInfo[currentExercise].instructions, 
          type: "default" 
        });
      };
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      setFeedback({
        message: "Unable to access camera. Please check your camera permissions.",
        type: "warning"
      });
    }
  };

  const resetWorkout = () => {
    setCurrentExerciseIndex(0);
    setReps(0);
    setWorkoutComplete(false);
    setFeedback({ 
      message: "Ready to start a new workout! Click the button to begin.", 
      type: "default" 
    });
  };

  const analyzeExercise = (exerciseName, pose, ctx) => {
    if (!pose || !pose.keypoints) return;

    const keypoints = pose.keypoints.reduce((acc, keypoint) => {
      acc[keypoint.name] = keypoint;
      return acc;
    }, {});

    const drawLine = (point1, point2, color = exerciseColor) => {
      if (point1 && point2 && point1.score > 0.3 && point2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    };

    const calculateAngle = (A, B, C) => {
      if (A && B && C) {
        const angle =
          Math.atan2(C.y - B.y, C.x - B.x) -
          Math.atan2(A.y - B.y, A.x - B.x);
        return Math.abs((angle * 180) / Math.PI);
      }
      return null;
    };

    // Common points for all exercises
    const leftShoulder = keypoints["left_shoulder"];
    const leftElbow = keypoints["left_elbow"];
    const leftWrist = keypoints["left_wrist"];

    const rightShoulder = keypoints["right_shoulder"];
    const rightElbow = keypoints["right_elbow"];
    const rightWrist = keypoints["right_wrist"];

    // Draw the skeleton
    drawLine(leftShoulder, leftElbow);
    drawLine(leftElbow, leftWrist);
    drawLine(rightShoulder, rightElbow);
    drawLine(rightElbow, rightWrist);
    
    // Add more body lines
    const leftHip = keypoints["left_hip"];
    const rightHip = keypoints["right_hip"];
    
    if (leftShoulder && leftHip && leftShoulder.score > 0.3 && leftHip.score > 0.3) {
      drawLine(leftShoulder, leftHip);
    }
    
    if (rightShoulder && rightHip && rightShoulder.score > 0.3 && rightHip.score > 0.3) {
      drawLine(rightShoulder, rightHip);
    }
    
    if (leftShoulder && rightShoulder && leftShoulder.score > 0.3 && rightShoulder.score > 0.3) {
      drawLine(leftShoulder, rightShoulder);
    }
    
    if (leftHip && rightHip && leftHip.score > 0.3 && rightHip.score > 0.3) {
      drawLine(leftHip, rightHip);
    }

    // Get arm angles
    const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

    if (!leftArmAngle || !rightArmAngle) return;

    // Exercise-specific analysis and feedback
    let feedbackMessage = "";
    let feedbackType = "default";

    // Shoulder Press
    if (exerciseName === "shoulder_press") {
      if (leftArmAngle > 160 && rightArmAngle > 160) {
        if (!repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          feedbackMessage = exerciseInfo[exerciseName].feedback.good;
          feedbackType = "good";
        }
      } else if (leftArmAngle < 90 || rightArmAngle < 90) {
        repCounted.current = false;
        if (reps > 0 && (leftArmAngle < 40 || rightArmAngle < 40)) {
          feedbackMessage = exerciseInfo[exerciseName].feedback.needsWork;
          feedbackType = "warning";
        }
      }
    }

    // Bicep Curl
    else if (exerciseName === "bicep_curl") {
      if (leftArmAngle < 50 && rightArmAngle < 50) {
        if (!repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          feedbackMessage = exerciseInfo[exerciseName].feedback.good;
          feedbackType = "good";
        }
      } else if (leftArmAngle > 150 || rightArmAngle > 150) {
        repCounted.current = false;
        if (reps > 0 && Math.abs(leftArmAngle - rightArmAngle) > 30) {
          feedbackMessage = exerciseInfo[exerciseName].feedback.needsWork;
          feedbackType = "warning";
        }
      }
    }

    // Lateral Raises
    else if (exerciseName === "lateral_raises") {
      if (leftArmAngle > 80 && rightArmAngle > 80) {
        if (!repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          feedbackMessage = exerciseInfo[exerciseName].feedback.good;
          feedbackType = "good";
        }
      } else if (leftArmAngle < 30 || rightArmAngle < 30) {
        repCounted.current = false;
        if (reps > 0 && Math.abs(leftArmAngle - rightArmAngle) > 25) {
          feedbackMessage = exerciseInfo[exerciseName].feedback.needsWork;
          feedbackType = "warning";
        }
      }
    }

    // Tricep Dips
    else if (exerciseName === "tricep_dips") {
      if (leftArmAngle > 120 && rightArmAngle > 120) {
        if (!repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          feedbackMessage = exerciseInfo[exerciseName].feedback.good;
          feedbackType = "good";
        }
      } else if (leftArmAngle < 70 || rightArmAngle < 70) {
        repCounted.current = false;
        if (reps > 0 && (leftArmAngle < 40 || rightArmAngle < 40)) {
          feedbackMessage = exerciseInfo[exerciseName].feedback.needsWork;
          feedbackType = "warning";
        }
      }
    }

    // Update feedback if we have new feedback
    if (feedbackMessage) {
      setFeedback({
        message: feedbackMessage,
        type: feedbackType
      });
    }
  };

  const detectPose = async () => {
    if (!detector || !videoRef.current || !canvasRef.current || !isCameraOn) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const runDetection = async () => {
      if (!isCameraOn || workoutComplete) return;

      if (video.paused || video.ended) {
        video.play();
      }

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      const poses = await detector.estimatePoses(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (poses.length > 0 && !workoutComplete) {
        analyzeExercise(currentExercise, poses[0], ctx);
      }

      if (!workoutComplete) {
        animationRef.current = requestAnimationFrame(runDetection);
      }
    };

    runDetection();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Initializing TensorFlow.js...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
      <div className="w-full bg-[#1a1f2e] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div 
          className="w-full px-8 py-6 text-center transition-colors duration-500"
          style={{ 
            backgroundColor: workoutComplete ? '#10B981' : exerciseColor,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          {workoutComplete ? (
            <h1 className="text-3xl font-bold text-white mb-2">Workout Complete! 🎉</h1>
          ) : (
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">{exerciseInfo[currentExercise]?.name || "Ready"}</h1>
              <h2 className="text-lg text-gray-200 opacity-90">Exercise {currentExerciseIndex + 1} of {exercises.length}</h2>
              <h3 className="text-2xl font-bold text-white">Reps: {reps}/10</h3>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Video Section */}
          <div className="w-full md:w-3/5">
            <div className="flex justify-center mb-6">
              {!isCameraOn && (
                <button 
                  onClick={startCamera}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  Start Workout
                </button>
              )}
              {workoutComplete && (
                <button 
                  onClick={resetWorkout}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  Start New Workout
                </button>
              )}
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#141824]">
              <video ref={videoRef} className="hidden" playsInline />
              <canvas ref={canvasRef} className="w-full h-auto block rounded-xl" />
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-2/5 space-y-6">
            {/* Instructions */}
            <div className="bg-[#141824] rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Instructions</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {exerciseInfo[currentExercise]?.instructions || "Get ready to start your workout!"}
              </p>
            </div>

            {/* Feedback */}
            {isCameraOn && !workoutComplete && (
              <div className={`bg-[#141824] rounded-xl p-6 shadow-lg border-l-4 ${
                feedback.type === 'good' ? 'border-emerald-500' :
                feedback.type === 'warning' ? 'border-yellow-500' :
                'border-blue-500'
              }`}>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Live Feedback</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feedback.message}</p>
              </div>
            )}

            {/* Progress */}
            {isCameraOn && !workoutComplete && (
              <div className="bg-[#141824] rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Workout Progress</h3>
                <div className="relative flex justify-between items-center">
                  <div className="absolute h-0.5 bg-gray-700 left-0 right-0 top-1/2 -translate-y-1/2" />
                  {exercises.map((ex, index) => (
                    <div 
                      key={ex}
                      className={`relative z-10 flex flex-col items-center transition-transform duration-300 ${
                        index === currentExerciseIndex ? 'transform scale-110' : ''
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-colors duration-300`}
                        style={{
                          backgroundColor: index === currentExerciseIndex ? exerciseInfo[ex].color :
                                         index < currentExerciseIndex ? '#10B981' : '#374151'
                        }}
                      >
                        {index + 1}
                      </div>
                      <span className="mt-2 text-xs text-gray-400">
                        {exerciseInfo[ex].name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Animation */}
      {showCompletionAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center animate-scale-up">
            <h1 className="text-5xl font-bold text-white mb-4">🎉 Workout Complete! 🎉</h1>
            <p className="text-2xl text-gray-300 mb-8">Great job! You've finished all exercises.</p>
            <button 
              onClick={() => {
                setShowCompletionAnimation(false);
                resetWorkout();
              }}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              Start New Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
