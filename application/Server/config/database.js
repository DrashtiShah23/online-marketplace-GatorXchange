const mysql = require("mysql2");
// Configures database environment variables
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 50,
  waitForConnections: true,
  debug: false
});

const promisePool = pool.promise();

module.exports = promisePool;