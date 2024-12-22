import { Sequelize } from 'sequelize';
import dbConfig from './config/db.config.js';

export const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,
  timezone: process.env.TZ,
  dialectOptions: {
    useUTC: true,
    timezone: process.env.TZ,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');

  return db.sync({
    // force: false,
    force: true,
  }).then(() => {
    console.log('Re-sync database.');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
