const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const WallOfFame = sequelize.define('WallOfFame', {
  scores: { type: DataTypes.INTEGER, allowNull: false },
  login: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'pseudo'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'WallOfFame', // Assurez-vous que le nom de la table correspond
  timestamps: false
});

module.exports = WallOfFame;
