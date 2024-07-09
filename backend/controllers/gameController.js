const { Word } = require('../models');
const sequelize = require('sequelize');

exports.getWord = async (req, res) => {
  try {
    const word = await Word.findOne({ order: sequelize.fn('RAND') });
    if (!word) {
      return res.status(404).send({ message: 'No word found' });
    }
    res.status(200).send({ word: word.word });
  } catch (err) {
    console.error('Error fetching word:', err);
    res.status(500).send({ message: 'Error fetching word' });
  }
};
