const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Message = sequelize.define('Message', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = Message;
