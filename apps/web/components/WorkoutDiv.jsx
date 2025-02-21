"use client"
import React, { useRef, useState, useEffect } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "../components/workout/WorkoutDiv.css";

async function initializeTFJS() {
  await tf.setBackend("webgl");
  await tf.ready();
  console.log("TensorFlow.js initialized with backend:", tf.getBackend());
}

initializeTFJS();

const WorkoutDiv = () => {

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
    };
  }, []);

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
       console.log("Audio play error:", err);
      
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        setWorkoutComplete(true);
        setShowCompletionAnimation(true);
       console.log("Audio play error:", err)
        
        // Hide completion animation after 5 seconds
        setTimeout(() => {
          setShowCompletionAnimation(false);
        }, 5000);
      }
      
      setReps(0);
    }
    else if (reps > 0 && reps % 5 === 0) {
      console.log("Audio play error:", err);
    }
  }, [reps, currentExerciseIndex, exercises.length]);

  useEffect(() => {
    if (isCameraOn && detector && videoRef.current && videoRef.current.readyState >= 2) {
      detectPose();
    }
  }, [isCameraOn, detector]);

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

  return (
    <div className="workout-container">
      <div className="workout-card">
        <div className="workout-header" style={{ backgroundColor: workoutComplete ? '#4CAF50' : exerciseColor }}>
          {workoutComplete ? (
            <h1>Workout Complete! 🎉</h1>
          ) : (
            <>
              <h1>{exerciseInfo[currentExercise]?.name || "Ready"}</h1>
              <h2>Exercise {currentExerciseIndex + 1} of {exercises.length}</h2>
              <h3>Reps: {reps}/10</h3>
            </>
          )}
        </div>
        
        <div className="workout-body">
          <div className="video-section">
            <div className="controls">
              {!isCameraOn && (
                <button 
                  onClick={startCamera} 
                  className="button start-button"
                >
                  Start Workout Now
                </button>
              )}
              
              {workoutComplete && (
                <button 
                  onClick={resetWorkout} 
                  className="button reset-button"
                >
                  Start New Workout
                </button>
              )}
            </div>
            
            <div className="video-container">
              <video 
                ref={videoRef} 
                className="video" 
                style={{ display: 'none' }} 
                playsInline
              />
              <canvas 
                ref={canvasRef} 
                className="canvas" 
              />
            </div>
          </div>
          
          <div className="info-section">
            <div className="instruction-box">
              <h3>Instructions</h3>
              <p>{exerciseInfo[currentExercise]?.instructions || "Get ready to start your workout!"}</p>
            </div>
            
            {isCameraOn && !workoutComplete && (
              <div className={`feedback-box ${feedback.type}`}>
                <h3>Live Feedback</h3>
                <p>{feedback.message}</p>
              </div>
            )}
            
            {isCameraOn && !workoutComplete && (
              <div className="progress-container">
                <h3>Workout Progress</h3>
                <div className="exercise-progress">
                  {exercises.map((ex, index) => (
                    <div 
                      key={ex} 
                      className={`exercise-indicator ${index === currentExerciseIndex ? 'active' : index < currentExerciseIndex ? 'completed' : ''}`}
                      style={{ backgroundColor: index === currentExerciseIndex ? exerciseInfo[ex].color : 
                               index < currentExerciseIndex ? '#4CAF50' : '#ddd' }}
                    >
                      {index + 1}
                      <div className="exercise-title">
                        {exerciseInfo[ex].name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCompletionAnimation && (
        <div className="completion-animation">
          <div className="completion-message">
            <h1>🎉 Workout Complete! 🎉</h1>
            <p>Great job! You've finished all exercises.</p>
            <button 
              onClick={() => {
                setShowCompletionAnimation(false);
                resetWorkout();
              }} 
              className="button reset-button"
            >
              Start New Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutDiv;