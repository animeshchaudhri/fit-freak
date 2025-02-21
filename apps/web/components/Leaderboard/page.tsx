"use client"
import React, { useEffect, useState } from 'react';
import api from '@/lib/api-client';

// Define types
interface User {
  id: string;
  user_id: string;
  calories_burned: number;
  number_workouts: number;
}

interface LeaderboardEntry {
  rank: number;
  user: User;
}

const leaderboardContainerStyle: React.CSSProperties = {
  backgroundColor: '#141432',
  padding: '1rem',
  borderRadius: '8px',
  color: '#fff',
  maxWidth: '800px',
  margin: 'auto',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thTdStyle: React.CSSProperties = {
  border: '1px solid #2A2A3C',
  padding: '0.75rem',
  textAlign: 'left',
};

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/v1/user/leaderboard');
        console.log("response: " , response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = response.data;
        if (data?.data?.leaderboardData) {
          setLeaderboard(data.data.leaderboardData);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div style={leaderboardContainerStyle}>
      <h2 style={titleStyle}>Leaderboard</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {!error && leaderboard.length === 0 && (
        <div>No leaderboard data available.</div>
      )}

      {!error && leaderboard.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Rank</th>
              <th style={thTdStyle}>User ID</th>
              <th style={thTdStyle}>Calories Burned</th>
              <th style={thTdStyle}>Number of Workouts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.user.id}>
                <td style={thTdStyle}>{entry.rank}</td>
                <td style={thTdStyle}>{entry.user.user_id}</td>
                <td style={thTdStyle}>{entry.user.calories_burned}</td>
                <td style={thTdStyle}>{entry.user.number_workouts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
