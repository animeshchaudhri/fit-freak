
// @ts-nocheck

"use client"
import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, Timer, Heart, Flame, Calendar, BarChart3, Footprints, MapPin, ArrowRight, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAuth } from "@/components/auth/auth-provider";

// Import GoogleFitComponent with dynamic loading to avoid SSR issues
const GoogleFitComponent = dynamic(() => import("./GoogleFitComponent"), { ssr: false });

const ActivityDashboard = () => {
  const { isLoading } = useAuth();
  const [googleFitData, setGoogleFitData] = useState(null);
  const [timeRange, setTimeRange] = useState("today");
  const [summaryData, setSummaryData] = useState({
    steps: 0,
    calories: 0,
    distance: 0,
    activeMinutes: 0,
    avgHeartRate: 0
  });
  
  useEffect(() => {
    if (googleFitData) {
      processGoogleFitData(googleFitData);
    }
  }, [googleFitData, timeRange]);

  const processGoogleFitData = (data) => {
    // Calculate step count
    const steps = data?.steps ? extractStepCount(data.steps) : 0;
    
    // Calculate calories
    const calories = data?.calories ? extractCalories(data.calories) : 0;
    
    // Calculate distance (in kilometers)
    const distance = data?.distance ? extractDistance(data.distance) : 0;
    
    // Calculate active minutes
    const activeMinutes = data?.activeMinutes ? extractActiveMinutes(data.activeMinutes) : 0;
    
    // Calculate average heart rate
    const avgHeartRate = data?.heartRate ? calculateAverageHeartRate(data.heartRate) : 0;
    
    setSummaryData({
      steps,
      calories,
      distance,
      activeMinutes,
      avgHeartRate
    });
  };

  const extractStepCount = (data) => {
    if (!data || !data.bucket) return 0;
    return data.bucket.reduce((total, bucket) => {
      if (bucket.dataset[0].point && bucket.dataset[0].point.length > 0) {
        total += bucket.dataset[0].point.reduce((sum, point) => sum + (point.value[0].intVal || 0), 0);
      }
      return total;
    }, 0);
  };

  const extractCalories = (data) => {
    if (!data || !data.bucket) return 0;
    const totalCalories = data.bucket.reduce((total, bucket) => {
      if (bucket.dataset[0].point && bucket.dataset[0].point.length > 0) {
        total += bucket.dataset[0].point.reduce((sum, point) => sum + (point.value[0].fpVal || 0), 0);
      }
      return total;
    }, 0);
    return Math.round(totalCalories);
  };

  const extractDistance = (data) => {
    if (!data || !data.bucket) return 0;
    const totalMeters = data.bucket.reduce((total, bucket) => {
      if (bucket.dataset[0].point && bucket.dataset[0].point.length > 0) {
        total += bucket.dataset[0].point.reduce((sum, point) => sum + (point.value[0].fpVal || 0), 0);
      }
      return total;
    }, 0);
    return (totalMeters / 1000).toFixed(2); // Convert to kilometers
  };

  const extractActiveMinutes = (data) => {
    if (!data || !data.bucket) return 0;
    let totalActiveMinutes = 0;
    
    data.bucket.forEach(bucket => {
      if (bucket.dataset[0].point && bucket.dataset[0].point.length > 0) {
        bucket.dataset[0].point.forEach(point => {
          // Filter for activities that count as "active" (exclude STILL, UNKNOWN, etc.)
          if (point.value[0].intVal >= 3 && point.value[0].intVal <= 8) {
            const startTimeMillis = parseInt(point.startTimeNanos) / 1000000;
            const endTimeMillis = parseInt(point.endTimeNanos) / 1000000;
            const durationMinutes = (endTimeMillis - startTimeMillis) / (1000 * 60);
            totalActiveMinutes += durationMinutes;
          }
        });
      }
    });
    
    return Math.round(totalActiveMinutes);
  };

  const calculateAverageHeartRate = (data) => {
    if (!data || !data.bucket) return 0;
    let heartRateSum = 0;
    let heartRateCount = 0;
    
    data.bucket.forEach(bucket => {
      if (bucket.dataset[0].point && bucket.dataset[0].point.length > 0) {
        bucket.dataset[0].point.forEach(point => {
          heartRateSum += point.value[0].fpVal || 0;
          heartRateCount++;
        });
      }
    });
    
    return heartRateCount > 0 ? Math.round(heartRateSum / heartRateCount) : 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-slate-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-400">Loading your fitness data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-gray-100">
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="border-b border-slate-800 px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Activity Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Track your daily progress and achievements</p>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* GoogleFitComponent - important part from your original code */}
            <div className="mr-4">
              <GoogleFitComponent onDataFetched={setGoogleFitData} />
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-8">
          {/* Primary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl p-6 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-500/10"></div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                      <Footprints className="w-4 h-4 text-blue-400" />
                    </div>
                    <h2 className="font-medium">Daily Steps</h2>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-bold">{summaryData.steps.toLocaleString()}</div>
                    <div className="flex items-center mt-1">
                      <div className="text-sm text-slate-400">Goal: 10,000</div>
                      <div className="ml-auto text-emerald-400 text-sm font-medium">
                        {Math.min(Math.round((summaryData.steps / 10000) * 100), 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" 
                  style={{width: `${Math.min(Math.round((summaryData.steps / 10000) * 100), 100)}%`}}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl p-6 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-green-500/10"></div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                      <Timer className="w-4 h-4 text-green-400" />
                    </div>
                    <h2 className="font-medium">Active Minutes</h2>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-bold">{summaryData.activeMinutes}</div>
                    <div className="flex items-center mt-1">
                      <div className="text-sm text-slate-400">Goal: 60</div>
                      <div className="ml-auto text-emerald-400 text-sm font-medium">
                        {Math.min(Math.round((summaryData.activeMinutes / 60) * 100), 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full" 
                  style={{width: `${Math.min(Math.round((summaryData.activeMinutes / 60) * 100), 100)}%`}}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl p-6 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-red-500/10"></div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mr-3">
                      <Heart className="w-4 h-4 text-red-400" />
                    </div>
                    <h2 className="font-medium">Heart Rate</h2>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-bold">{summaryData.avgHeartRate}</div>
                    <div className="flex items-center mt-1">
                      <div className="text-sm text-slate-400">Average BPM</div>
                      <div className="ml-auto text-emerald-400 text-sm font-medium">
                        {summaryData.avgHeartRate > 0 ? 'Normal' : 'No data'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full" 
                  style={{width: `${summaryData.avgHeartRate > 0 ? '80' : '0'}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Secondary Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl p-6 border border-slate-800/80">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium flex items-center">
                  <Activity className="w-5 h-5 text-blue-400 mr-2" />
                  Weekly Activity
                </h2>
                <button className="text-xs text-slate-400 hover:text-white transition">
                  View Details
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs font-medium text-slate-500 mb-2">{day}</div>
                    <div className="w-full flex flex-col items-center">
                      <div className="w-10 h-20 bg-slate-800/80 rounded-md relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400/30" 
                             style={{height: `${30 + Math.random() * 70}%`}}></div>
                      </div>
                      <p className="text-xs font-medium text-slate-400 mt-2">{Math.floor(1000 + Math.random() * 9000)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-slate-400">Daily Average</div>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold">7,845</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-slate-400">Weekly Total</div>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold">54,915</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl p-6 border border-slate-800/80">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium flex items-center">
                  <Dumbbell className="w-5 h-5 text-purple-400 mr-2" />
                  Workout Distribution
                </h2>
                <button className="text-xs text-slate-400 hover:text-white transition">
                  View Details
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                    <Footprints className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium">Walking</p>
                  <p className="text-lg font-bold mt-1">{Math.round(summaryData.activeMinutes * 0.6)} min</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                    <Dumbbell className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-sm font-medium">Strength</p>
                  <p className="text-lg font-bold mt-1">{Math.round(summaryData.activeMinutes * 0.2)} min</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                    <Activity className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-sm font-medium">Running</p>
                  <p className="text-lg font-bold mt-1">{Math.round(summaryData.activeMinutes * 0.15)} min</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-2">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-sm font-medium">Other</p>
                  <p className="text-lg font-bold mt-1">{Math.round(summaryData.activeMinutes * 0.05)} min</p>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">Time Distribution</span>
                    <span className="text-xs font-medium">{summaryData.activeMinutes} min total</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500" style={{width: '60%'}}></div>
                    <div className="h-full bg-purple-500" style={{width: '20%'}}></div>
                    <div className="h-full bg-green-500" style={{width: '15%'}}></div>
                    <div className="h-full bg-amber-500" style={{width: '5%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/90 rounded-xl border border-slate-800/80">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="font-medium flex items-center">
                <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                Recent Activities
              </h2>
              <button className="text-xs text-slate-400 hover:text-white transition">
                View All
              </button>
            </div>
            
            <div className="divide-y divide-slate-800">
              <div className="p-4 flex items-center hover:bg-slate-800/30 transition">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <Dumbbell className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Morning Workout</h3>
                  <p className="text-xs text-slate-400 mt-0.5">45 minutes • 300 calories</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">2h ago</span>
                </div>
              </div>
              
              <div className="p-4 flex items-center hover:bg-slate-800/30 transition">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                  <Footprints className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Lunch Walk</h3>
                  <p className="text-xs text-slate-400 mt-0.5">25 minutes • {summaryData.distance} km</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">5h ago</span>
                </div>
              </div>
              
              <div className="p-4 flex items-center hover:bg-slate-800/30 transition">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <Heart className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Meditation Session</h3>
                  <p className="text-xs text-slate-400 mt-0.5">15 minutes • Heart rate: {Math.max(summaryData.avgHeartRate - 15, 60)} BPM</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityDashboard;