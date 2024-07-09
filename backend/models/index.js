const sequelize = require('../config/db');
const User = require('./user');
const Word = require('./word');
const WallOfFame = require('./wallOfFame');

User.hasMany(WallOfFame, { foreignKey: 'login', sourceKey: 'pseudo' });
WallOfFame.belongsTo(User, { foreignKey: 'login', targetKey: 'pseudo' });

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized');
};

module.exports = {
  User,
  Word,
  WallOfFame,
  syncDatabase
};
