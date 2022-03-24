// const dotenv = require("dotenv")
// dotenv.config()

// let config = {}

// config.database = {}

// config.database.user = process.env.DATABASE_HOST || 'localhost'
// config.database.password = process.env.DATABASE_PASSWORD || 'secret'
// config.database.name = process.env.DATABASE_NAME || 'secret' 

// module.exports = config

const mysql = require("mysql2");
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE_NAME,
  connectionLimit: 50,
  waitForConnections: true,
  debug: false
});

module.exports = pool;