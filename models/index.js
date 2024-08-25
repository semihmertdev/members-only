const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Message = require('./message');

// İlişkileri burada tanımlayın
User.hasMany(Message, { foreignKey: 'userId', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  User,
  Message
};