require('../dotenv').config()
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE_NAME,
  connectionLimit: 50,
  waitForConnections: true,
  debug: false
});