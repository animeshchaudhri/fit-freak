// @ts-nocheck
"use client"

import { useState, useEffect } from "react";

import { ArrowLeft, Play, Pause, RefreshCw, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const WorkoutComponentDynamic = ({ exercise, onBack }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(convertDurationToSeconds(exercise.duration));
  const [isCompleted, setIsCompleted] = useState(false);

  // Convert duration string (e.g. "5 min") to seconds
  function convertDurationToSeconds(durationString) {
    const match = durationString.match(/(\d+)/);
    if (!match) return 300; // Default to 5 minutes if parsing fails
    return parseInt(match[0]) * 60;
  }

  // Format seconds to mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    let timer;
    
    if (isStarted && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsCompleted(true);
            setIsStarted(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isStarted, isPaused, timeLeft]);

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setTimeLeft(convertDurationToSeconds(exercise.duration));
    setIsStarted(false);
    setIsPaused(false);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Button>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="relative aspect-video">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{exercise.name}</h1>
            <p className="text-gray-400">with {exercise.instructor}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-gray-700 px-3 py-2 rounded-md">
              {exercise.level}
            </div>
            <div className="bg-gray-700 px-3 py-2 rounded-md">
              {exercise.duration}
            </div>
            <div className="bg-gray-700 px-3 py-2 rounded-md">
              {exercise.calories} calories
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="text-5xl font-mono font-bold mb-6">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex justify-center gap-4">
              {!isStarted && !isCompleted && (
                <Button 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                  onClick={handleStart}
                >
                  <Play className="w-5 h-5" />
                  Start Workout
                </Button>
              )}
              
              {isStarted && !isPaused && (
                <Button 
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg"
                  onClick={handlePause}
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </Button>
              )}
              
              {isStarted && isPaused && (
                <Button 
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  onClick={handleResume}
                >
                  <Play className="w-5 h-5" />
                  Resume
                </Button>
              )}
              
              {(isStarted || isPaused || isCompleted) && (
                <Button 
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                  onClick={handleReset}
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </Button>
              )}
            </div>
            
            {isCompleted && (
              <div className="mt-8 flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-xl font-semibold text-green-400">Workout Completed!</p>
                <p className="text-gray-400 mt-2">Good job! You've burned approximately {exercise.calories} calories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponentDynamic;