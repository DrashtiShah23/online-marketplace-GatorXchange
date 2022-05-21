// const express = require('express')
// const router = express.Router();
// const bcrypt = require('bcrypt')
// const config = require('../database/database')
// const mysql = require("mysql2")
// const database = require('../index')

// const db_pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: '`csc648-team1-db`',
//     waitForConnections: true,
//     connectionLimit: 50,
//     queueLimit: 0
// })


// const store = []

// // router.get('/', async (req, res) => {
// //     res.send("vp router called!")
// // })



// router.post('/VPResult', async (req, res) => {

//     console.log('Posted data. Data is:');
//     console.log(req.body);

//     res.send(req.body);
//     store.push(req.body)

// });



// router.get('/VPResult_getTest', async (req, res) => {
//     res.send(req.body)
//     console.log("result getTest: ", req.body)
// });

// router.get('/VPResult', async (req, res) => {

//     res.send("Vp result called " + store)

//     console.log('Got a request: ');
//     console.log(req.body);
//     // console.log(req.body.category);
//     // console.log(req.body.searchTerm);

//     // Get the search params and assign to separate variables
//     req.send('send request to DB' + database)
//     console.log(database)
//     const category = req.body.category;
//     const searchTerm = req.body.searchTerm;
//     console.log(category);
//     console.log(searchTerm);
//     // Represents the SQL query to run to get the relevant posts from database
//     let getPosts;

//     // User clicked search button without any params. Display all posts from database
//     if (searchTerm == '' && category == '') {
//         getPosts = 'SELECT * FROM `csc648-team1-db`.`posts`';
//     }
//     // User entered a search term and selected a category
//     else if (searchTerm != '' && category != '') {
//         getPosts =
//             `SELECT *
//         FROM posts
//         INNER JOIN categories
//         ON posts.fk_category_id = categories.category_id
//         WHERE category = '` + category + `'
//         AND ( title LIKE '%` + searchTerm + `%'
//         OR description LIKE '%` + searchTerm + `%')`;
//     }
//     // User entered a search term but did not select a category
//     else if (searchTerm != '' && category == '') {
//         getPosts = `SELECT * FROM posts WHERE title LIKE '%` + searchTerm + `%' OR
//         description LIKE '%` + searchTerm + `%')`;
//     }
//     // User did not enter a search term but selected a category
//     else if (searchTerm == '' && category != '') {
//         getPosts =
//             `SELECT *
//         FROM posts
//         INNER JOIN categories
//         ON posts.fk_category_id = categories.category_id
//         WHERE category = '` + category + `'`;
//     }
//     // Extract posts from Posts table in database based on user's search params
//     db_pool.query(getPosts, function (error, results) {
//         if (error) {
//             console.error('Error querying database: ' + error.stack);
//             return;
//         }
//         // Store the list of search results to send over to the VP Result page
//         let searchResults = [];
//         // For every search result, create a post object containing relevant post info to display
//         for (let i = 0; i < results.length; i++) {
//             let post = {
//                 category: results[i].fk_category_id,
//                 image: results[i].photo_path,
//                 title: results[i].title,
//                 price: results[i].price,
//                 description: results[i].description
//             }
//             console.log('Post sent over is: ');
//             console.log(post.category);
//             console.log(post.image);
//             console.log(post.title);
//             console.log(post.price);
//             console.log(post.description);
//             // Add the post to the list of search results
//             searchResults.push(post);
//         }
//         // Send the list of search results to the VP Result page to display
//         res.send(searchResults);
//     });
//     console.log('Finished sending database results');
// });

// module.exports = router 
