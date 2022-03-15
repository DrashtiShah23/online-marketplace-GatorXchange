require('dotenv').config();
const mysql = require("mysql");
const express = require('express');

const app = express();
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySql connected');
//     db.query('example');
// })
// app.get('/createDB', function (req, res) {
//     let sql = 'Create DATABASE nodeMySql';
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(result)
//         res.send('DB created')
//     })
// });

// Create a connection to the database using account info
const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
  })
  // Try connecting to the database. If connection failed, throw an error
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('MySql connected');
    // Sample test query to database that just shows all users in user table
    db.query('SELECT * FROM `csc648-team1-db`.`users`', (error, results, fields) => {
      console.log(results);
      console.log(results[0].sfsu_id);
      console.log(results[0].username);
      console.log(results[0].email);
    });
  });

function search(req, res, next) {
    // The user's provided title
    const title = req.query.title;
    // The user's provided description
    const description = req.query.description;
    // The user's selected category
    const category = req.query.category;

    let query = 'SELECT * FROM `csc648-team1-db`.`posts`';
    if (title != '' && category != '') {
        query = `SELECT * FROM posts WHERE category = '` + category + `' AND 
        ( title LIKE '%` + title + `%' OR description LIKE '%` + description + `%')`;
    }
    else if (title != '' && category == '') {
        query = `SELECT * FROM posts WHERE title LIKE '%` + title + `%' OR 
        description LIKE '%` + description + `%')`;
    }
    else if (title == '' && category != '') {
        query = `SELECT * FROM posts WHERE category = '` + category + `'`;
    }
    db.query(query, function (err, result) {
        if (err) {
            req.title = '';
            req.description = '';
            req.category = '';
            next();
        }
        req.title = title;
        req.description = description;
        req.category = '';

        next()
    })
}

// Vertical prototype result page receives search request data
// from vertical prototype test home page
app.get('/VP_Result', search, function (req, res,) {

    var searchResult = req.searchResult;
    res.render('/VP_Result', {
        results: searchResult.length,
        searchFor: req.searchFor,
        searchResult: searchResult,
        category: req.category
    })
})




