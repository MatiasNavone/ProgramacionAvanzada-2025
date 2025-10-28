const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'usersdb';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'password';


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5433;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida');
  } catch (err) {
    console.error('❌ No se pudo conectar a PostgreSQL:', err.message || err);
  }
};

module.exports = { sequelize, testConnection };
