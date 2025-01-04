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
    max: dbConfig.pool.max, // Максимальна кількість з'єднань у пулі
    min: dbConfig.pool.min, // Мінімальна кількість з'єднань у пулі
    acquire: dbConfig.pool.acquire, // Максимальний час, протягом якого пул намагатиметься отримати з'єднання перед викиданням помилки
    idle: dbConfig.pool.idle, // Максимальний час, протягом якого з'єднання може залишатися неактивним у пулі
  },
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');

  return db.sync({
    // force: false,
    force: true, // Синхронізація моделей з базою даних
  }).then(() => {
    console.log('Re-sync database.');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
