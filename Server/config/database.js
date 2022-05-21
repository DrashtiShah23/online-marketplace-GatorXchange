/*********************************************************************
 * Purpose: Sets up a MySQL database pool that will handle connections
 * and promises involving MySQL statements
 * Input: Team 1's MySQL database credentials from .env file
 * Output: A MySQL promise pool
 * Error Messages: None
 * Authors: Thomas Nguyen and Javier Marquez
 *********************************************************************/
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