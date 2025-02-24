// src/database/sequelize.config.js
require('ts-node/register');
const configs = require('../configs.ts');

module.exports = {
  storage: "sequelize.sqlite",
  dialect: "sqlite",
  
};
