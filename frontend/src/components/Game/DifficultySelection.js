import React from 'react';
import { useNavigate } from 'react-router-dom';

const DifficultySelection = () => {
  const pseudo = localStorage.getItem('pseudo'); // Récupérer le pseudo

  const navigate = useNavigate();

  const handleDifficultySelection = (difficulty) => {
    localStorage.setItem('difficulty', difficulty);
    navigate('/game');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-14 bg-white w-2/5 rounded shadow-lg text-center'>
        {pseudo && <p className="mb-4 text-5xl font-bold text-blue-500">Bienvenue, {pseudo} !</p>}
        <h1 className="text-3xl font-bold mb-6">Choisissez le niveau de difficulté</h1>
        <button className="px-4 py-2 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4" onClick={() => handleDifficultySelection('easy')}>Facile</button>
        <button className="px-4 py-2 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4" onClick={() => handleDifficultySelection('medium')}>Moyen</button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4" onClick={() => handleDifficultySelection('hard')}>Difficile</button>
      </div>
    </div>
  );
};

export default DifficultySelection;
