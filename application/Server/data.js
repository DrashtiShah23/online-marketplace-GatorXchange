require('dotenv').config();
const mysql = require("mysql");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const port = 3001;

// Use express middleware to parse req body into json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a connection to the database using account info
const database = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
});

// Establish a connection to the database
database.connect((err) => {
  // If connection to database failed, throw an error
  if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
  }
  console.log('MySQL connected');

});

// Populate the database with entries upon app start





// store holds the user search parameters globally
let store = [];

// Send user search parameters to server 
app.post('/VPResult', (req, res) => {
  console.log();
  console.log('Got a post request. Request body is:');
  console.log(req.body);
  console.log('Posted category: ' + req.body.category);
  console.log('Posted search term: ' + req.body.searchTerm);
  store.push(req.body);
  res.send(req.body);
  
});

// Get the search params and assign to separate variables
app.get('/VPResult', (req, res) => {
  console.log();
  console.log(store);
  console.log('Get request received the following request body:');
  
  let storeLength = store.length;
  console.log('Category is: ' + store[storeLength - 1].category);
  console.log('Search term is: ' + store[storeLength - 1].searchTerm);

  // Set the category and search term from the user's input
  const category = store[storeLength - 1].category;
  const searchTerm = store[storeLength - 1].searchTerm;
  console.log('Category variable is: ' + category);
  console.log('Search term variable is: ' + searchTerm);

  // Represents the SQL query to run to get the relevant posts from database
  let getPosts;

  // User clicked search button without any params. Display all posts from database
  if (searchTerm == '' && category == '' ) {
      getPosts = 'SELECT * FROM `csc648-team1-db`.`posts`';
  }
  // User entered a search term and selected a category
  else if (searchTerm != '' && category != '') {
    getPosts = 
      `SELECT * 
      FROM posts 
      INNER JOIN categories 
      ON posts.fk_category_id = categories.category_id
      WHERE category = '` + category + `' 
      AND ( title LIKE '%` + searchTerm + `%' 
      OR description LIKE '%` + searchTerm + `%')`;
  }
  // User entered a search term but did not select a category
  else if (searchTerm != '' && category == '') {
      getPosts = `SELECT * FROM posts WHERE title LIKE '%` + searchTerm + `%' OR 
      description LIKE '%` + searchTerm + `%'`;
  }
  // User did not enter a search term but selected a category
  else if (searchTerm == '' && category != '') {
    getPosts = 
      `SELECT * 
      FROM posts 
      INNER JOIN categories 
      ON posts.fk_category_id = categories.category_id
      WHERE category = '` + category + `'`;
  }
  // Extract posts from Posts table in database based on user's search params 
  let searchResults = [];
  database.query(getPosts, function (error, results) {
      if (error) {
          console.error('Error querying database: ' + error.stack);
          return;
      }
      //console.log(results);
      // Store the list of search results to send over to the VP Result page
  
      // For every search result, create a post object containing relevant post info to display
      for (let i = 0; i < results.length; i++) {
          let post = {
            category: results[i].category,
            image: results[i].photo_path,
            title: results[i].title,
            price: results[i].price,
            description: results[i].description
          };
          console.log();
          console.log(`Post ${i} sent over is: `);
          console.log('Post category: ' + post.category);
          console.log('Post image: ' + post.image);
          console.log('Post title: ' + post.title);
          console.log('Post price: ' + post.price);
          console.log('Post description: ' + post.description);
          console.log();
          // Add the post to the list of search results
          console.log("posts: ", post) 
          searchResults.push(post);
          
      }

  console.log('Database results array is: ' + JSON.stringify(searchResults));
  
  // Send the database results to the frontend
  res.send(JSON.stringify(searchResults));
  
  console.log('Finished sending database results');
  
  });
  
  
});


app.listen(port, () => console.log(`Server is listening on port ${port}`));