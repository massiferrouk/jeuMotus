const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());

const generateRandomWord = async (length) => {
  try {
    const response = await axios.get(`https://random-word-form.herokuapp.com/random/noun`);
    const word = response.data[0];
    return word.length === length ? word : await generateRandomWord(length); // Recurse if the word length doesn't match
  } catch (error) {
    console.error('Error fetching word from Random Word API:', error);
    throw new Error('Failed to fetch the word');
  }
};

app.get('/api/random-word', async (req, res) => {
  try {
    const { difficulty } = req.query;
    let wordLength;

    switch (difficulty) {
      case 'easy':
        wordLength = 4;
        break;
      case 'medium':
        wordLength = 6;
        break;
      case 'hard':
        wordLength = 8;
        break;
      default:
        wordLength = 4;
    }

    const word = await generateRandomWord(wordLength);
    res.json({ word: word.toLowerCase() });
  } catch (error) {
    console.error('Error fetching word:', error);
    res.status(500).json({ error: 'Failed to fetch the word' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
