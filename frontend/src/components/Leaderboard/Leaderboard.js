import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await axios.get('http://localhost:5000/api/game/leaderboard');
      setLeaderboard(res.data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <ul className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl">
        {leaderboard.map((entry, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span className="text-xl">{entry.login}</span>
            <span className="text-xl font-bold">{entry.scores}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
