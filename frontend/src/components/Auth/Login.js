import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { pseudo, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', { pseudo, password });
      console.log('Login response:', res);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('pseudo', pseudo); // Stocker le pseudo
      navigate('/difficulty'); // Rediriger vers la sélection de la difficulté
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-14 bg-white w-1/3 rounded shadow-lg'>
        <h1 className="text-4xl text-center font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className="block text-lg font-bold mb-2">Pseudo</label>
            <input 
              type="text" 
              value={pseudo} 
              onChange={(e) => setPseudo(e.target.value)} 
              placeholder="Pseudo" 
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
          <div className='mb-6'>
            <label className="block text-lg font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
          <div className='text-center'>
            <button type="submit" ref={formRef} className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Login</button>
            <button type="button" onClick={handleRegisterRedirect} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
