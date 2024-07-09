const express = require('express');
const { getWord } = require('../controllers/gameController');
const router = express.Router();
const { WallOfFame } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint pour récupérer le score actuel de l'utilisateur
router.get('/score', authMiddleware, async (req, res) => {
    const { pseudo } = req.user;
  
    try {
      const entry = await WallOfFame.findOne({ where: { login: pseudo } });
      if (entry) {
        res.status(200).send({ score: entry.scores });
      } else {
        res.status(404).send({ message: 'Score not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error fetching score', error });
    }
  });

router.post('/score', authMiddleware, async (req, res) => {
    const { points } = req.body;
    const { pseudo } = req.user;
  
    try {
      let entry = await WallOfFame.findOne({ where: { login: pseudo } });
      if (entry) {
        entry.scores += points;
        await entry.save();
      } else {
        entry = await WallOfFame.create({ login: pseudo, scores: points });
      }
      res.status(200).send(entry);
    } catch (error) {
      res.status(500).send({ message: 'Error updating score', error });
    }
  });
  
  router.get('/leaderboard', async (req, res) => {
    try {
      const leaderboard = await WallOfFame.findAll({
        order: [['scores', 'DESC']],
        limit: 10
      });
      res.status(200).send(leaderboard);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching leaderboard', error });
    }
  });

module.exports = router;
