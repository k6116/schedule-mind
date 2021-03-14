

var Sequelize = require('sequelize')

const config = require('./config').config;

// const sequelize = new Sequelize(config.dbname, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect
// });

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
  }
  })
} else {
  // the application is executed on the local machine ... use mysql
  var sequelize = new Sequelize('postgres', 'postgres', 'postgres', config);
}

// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize: sequelize,
  connect: connect
};
