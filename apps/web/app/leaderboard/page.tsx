import React from 'react';
import Leaderboard from '@/components/Leaderboard/page';

const LeaderboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Your sidebar component */}
      {/* <Sidebar /> */}

      {/* Main content area */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;
