import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [numeroSecu, setNumeroSecu] = useState('');

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { pseudo, password, numero_secu: numeroSecu });
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
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

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-14 bg-white w-1/3 rounded shadow-lg'>
        <h1 className="text-4xl font-bold mb-4 text-center">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-bold mb-2">Pseudo</label>
            <input 
              type="text" 
              value={pseudo} 
              onChange={(e) => setPseudo(e.target.value)} 
              placeholder="Pseudo" 
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
          <div>
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
          <div>
            <label className="block text-lg font-bold mb-2">numero_secu</label>
            <input 
              type="text" 
              value={numeroSecu} 
              onChange={(e) => setNumeroSecu(e.target.value)} 
              placeholder="Numéro de sécurité" 
              required 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
          <div ref={formRef} className='text-center mt-3'>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
