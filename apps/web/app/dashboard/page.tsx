"use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Grid,
  Layout,
  Upload,
  Settings,
  Plus
} from 'lucide-react';

const FitnessProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Hardcoded user data
  const userData = {
    username: "fitness_enthusiast",
    posts: 86,
    followers: 1432,
    following: 891,
    bio: "🏋️‍♂️ Fitness Journey | 💪 Personal Best: 225lb Bench\n🎯 Goal: 2024 Fitness Competition"
  };

  // Hardcoded posts data
  const posts = [
    {
      id: 1,
      image: "/api/placeholder/300/300",
      type: "workout",
      likes: 124
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      type: "progress",
      likes: 89
    },
    {
      id: 3,
      image: "/api/placeholder/300/300",
      type: "workout",
      likes: 156
    },
    {
      id: 4,
      image: "/api/placeholder/300/300",
      type: "progress",
      likes: 201
    },
    {
      id: 5,
      image: "/api/placeholder/300/300",
      type: "workout",
      likes: 167
    },
    {
      id: 6,
      image: "/api/placeholder/300/300",
      type: "progress",
      likes: 145
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Profile Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-8">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gray-700 mr-8"></div>
          
          {/* Profile Stats */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">{userData.username}</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <div className="font-semibold">{userData.posts}</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{userData.followers}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{userData.following}</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
            </div>
            
            <p className="text-sm whitespace-pre-line">{userData.bio}</p>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="border-t border-gray-800">
          <div className="flex justify-center space-x-12">
            <Button 
              variant="ghost"
              className={`py-4 ${activeTab === 'posts' ? 'border-t-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <Grid className="w-4 h-4 mr-2" />
              Posts
            </Button>
            <Button 
              variant="ghost"
              className={`py-4 ${activeTab === 'workouts' ? 'border-t-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('workouts')}
            >
              <Layout className="w-4 h-4 mr-2" />
              Workouts
            </Button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-3 gap-1">
          {posts.map(post => (
            <div key={post.id} className="aspect-square relative group">
              <img 
                src={post.image} 
                alt="Fitness post" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white">❤️ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button (Fixed) */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600">
          <Upload className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default FitnessProfile;