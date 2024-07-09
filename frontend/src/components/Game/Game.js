import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Lottie from 'react-lottie';
import * as animationData from '../../animation/looseanimation.json';

const Game = () => {
  const [word, setWord] = useState('');
  const [attempts, setAttempts] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreMessage, setScoreMessage] = useState('');

  const navigate = useNavigate();

  const difficulty = localStorage.getItem('difficulty') || 'easy'; // Récupérer la difficulté 
  const token = localStorage.getItem('token');

  // Ref pour toutes les cases de la grille
  const inputRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/random-word', {
          params: { difficulty },
        });
        console.log('API response:', res.data); // Log the response data
        const fetchedWord = res.data.word.toLowerCase();
        setWord(fetchedWord);
        // Initialiser la première lettre pour chaque ligne
        const initialAttempts = Array(6).fill(fetchedWord.charAt(0));
        setAttempts(initialAttempts);
      } catch (err) {
        console.error('Error fetching word:', err);
        setError('Failed to fetch the word.');
      }
    };

    fetchWord();
  }, [difficulty]);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/game/score', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setScore(res.data.score);
      } catch (err) {
        console.error('Error fetching score:', err);
      }
    };
  
    fetchScore();
  }, [token]);

  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 1) return; // Allow only one character
    const newAttempts = attempts.slice();
    newAttempts[rowIndex] = newAttempts[rowIndex].split('');
    newAttempts[rowIndex][colIndex] = value;
    newAttempts[rowIndex] = newAttempts[rowIndex].join('');
    setAttempts(newAttempts);

    // Déplacer le focus vers la case suivante si une lettre est entrée
    const nextIndex = colIndex + 1;
    if (nextIndex < word.length && value) {
      inputRefs.current[rowIndex][nextIndex].focus();
    }
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Backspace' && colIndex > 0) {
      const newAttempts = attempts.slice();
      newAttempts[rowIndex] = newAttempts[rowIndex].split('');
      newAttempts[rowIndex][colIndex] = '';
      newAttempts[rowIndex] = newAttempts[rowIndex].join('');
      setAttempts(newAttempts);

      const prevIndex = colIndex - 1;
      inputRefs.current[rowIndex][prevIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentAttempt = attempts[currentRow];
    if (currentAttempt.length !== word.length) return;

    let points = 0;

    if (currentAttempt === word) {
      setMessage('Congratulations! You guessed the word!');
      setGameOver(true);
      setShowConfetti(true);
      points = 10; // Ajoutez 10 points pour avoir trouvé le mot
    } else if (currentRow >= 5) {
      setMessage(`Game over! The word was ${word}`);
      setGameOver(true);
      setShowLottie(true);
      setTimeout(() => setShowLottie(false), 5000); // Fermer l'animation après 5 secondes
      points = 1; // Ajoutez 1 point pour avoir essayé
    } else {
      setCurrentRow(currentRow + 1);
      // Déplacer le focus vers la première colonne de la ligne suivante
      setTimeout(() => {
        inputRefs.current[currentRow + 1][1].focus();
      }, 100);
      return
    }

    await updateScore(points);

    // Utiliser une fonction pour garantir la mise à jour correcte
    setScore(prevScore => {
      const newScore = prevScore + points;
      setScoreMessage(`Votre score est <span class="text-red-500 font-bold text-2xl">${newScore}</span>`);
      return newScore;
    });
  };

  const updateScore = async (points) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/game/score', { points }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  const getLetterClass = (letter, index, rowIndex) => {
  
    const correctWordCounts = {};
    const attemptCounts = new Array(word.length).fill(0);
    const correctFlags = new Array(word.length).fill(false); // Flags for correct positions
  
    // Compter les occurrences de chaque lettre dans le mot cible
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!correctWordCounts[char]) {
        correctWordCounts[char] = 0;
      }
      correctWordCounts[char]++;
    }
  
    // Marquer les lettres correctes (rouges) et les compter
    for (let i = 0; i < word.length; i++) {
      const char = attempts[rowIndex][i];
      if (word[i] === char) {
        correctFlags[i] = true;
        correctWordCounts[char]--;
      }
    }
  
    // Marquer les lettres présentes mais mal placées (jaunes)
    for (let i = 0; i < word.length; i++) {
      const char = attempts[rowIndex][i];
      if (!correctFlags[i] && word.includes(char) && correctWordCounts[char] > 0) {
        attemptCounts[i] = 1; // Jaune
        correctWordCounts[char]--;
      }
    }
  
    // Si la lettre est correcte (rouge)
    if (correctFlags[index]) {
      return 'bg-red-500 text-white';
    }
  
    // Si la lettre est dans le mot mais mal placée (jaune)
    if (attemptCounts[index] === 1) {
      return 'bg-yellow-500 text-white';
    }
  
    // Sinon, marquez en bleu (lettre incorrecte ou excédentaire)
    return 'bg-blue-500 text-white';
  };
  

  const renderRow = (attempt, rowIndex) => {
    const letters = attempt.split('').concat(Array(word.length - attempt.length).fill(''));
    return (
      <div key={rowIndex} className="flex justify-center gap-2">
        {letters.map((letter, colIndex) => (
          <input
            key={colIndex}
            type="text"
            maxLength="1"
            value={letter}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
            className={`w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-bold lowercase transition-all duration-300 ease-in-out transform ${rowIndex < currentRow || gameOver ? getLetterClass(letter, colIndex, rowIndex) : ''}`}
            disabled={rowIndex !== currentRow || gameOver}
            ref={el => inputRefs.current[rowIndex] ? inputRefs.current[rowIndex][colIndex] = el : inputRefs.current[rowIndex] = { [colIndex]: el }}
          />
        ))}
      </div>
    );
  };

  const handleRestart = () => {
    navigate('/difficulty'); // Rediriger vers la page de sélection de difficulté
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      {showConfetti && <Confetti />}
      {showLottie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowLottie(false)}>
          <Lottie options={{
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
            height={400}
            width={700}
          />
        </div>
      )}
      <div className="px-14 py-6 text-center bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Motus</h1>
        {message && (
          <p className={`mb-4 ${message.startsWith('Congratulations') ? 'text-green-500' : 'text-red-500'} text-2xl font-semibold`}>
            {message}
          </p>
        )}
        {scoreMessage && (
          <p className="mb-4 text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: scoreMessage }}></p>
        )}
        <p className="mb-4 font-semibold text-xl">Le mot à deviner commence par : {word && word.charAt(0)}</p>
        <div className="grid gap-2 justify-center">
          {attempts.map((attempt, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {renderRow(attempt, rowIndex)}
            </div>
          ))}
        </div>
        {gameOver && (
          <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded">
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
