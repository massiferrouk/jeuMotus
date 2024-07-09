const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Word = sequelize.define('Word', {
  word: { type: DataTypes.STRING, allowNull: false },
  longueur: { type: DataTypes.INTEGER, allowNull: false },
  difficulté: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'Mots', // Assurez-vous que le nom de la table correspond
  timestamps: false
});

module.exports = Word;
