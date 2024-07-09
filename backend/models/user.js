const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  pseudo: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  numero_secu: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'Users', // Assurez-vous que le nom de la table correspond
  timestamps: false
});

module.exports = User;
