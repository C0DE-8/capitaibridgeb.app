// db.js
const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

db.on('connection', (connection) => {
  connection.on('error', (err) => {
    console.error('[DB] MySQL connection error:', err.code || err.message);
  });
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('[DB] Initial MySQL connection failed:', err.code || err.message);
    return;
  }

  console.log('[DB] Connected to MySQL database');
  connection.release();
});

module.exports = db;
