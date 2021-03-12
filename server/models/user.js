
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

const User = sequelize.define('user',
  {
    id: { type: Sequelize.INTEGER, field: 'ID', primaryKey: true, autoIncrement: true },
    firstName: { type: Sequelize.STRING, field: 'FirstName' },
    lastName: { type: Sequelize.STRING, field: 'LastName' },
    emailAddress: { type: Sequelize.STRING, field: 'EmailAddress' },
  },
  {
    schema: 'public',
    tableName: 'Users',
    timestamps: false
  }
);

module.exports = User
