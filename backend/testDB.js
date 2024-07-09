require('dotenv').config();
const mysql = require('mysql2/promise');

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Connected to the database successfully');
    await connection.end();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();
