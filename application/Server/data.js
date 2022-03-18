require('dotenv').config();
const mysql = require("mysql");
const express = require('express');
const app = express();
// Use express middleware to parse req body into json
app.use(express.json());
const port = 3001;


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
  // Sample test query to database that just shows all posts in post table
  // database.query('SELECT * FROM `csc648-team1-db`.`Posts`', (error, results, fields) => {
  //     console.log(results);
  //     for (let i = 0; i < results.length; i++) {
  //     console.log('Post ID: ' + results[i].post_id);
  //     console.log('Title: ' + results[i].title);
  //     console.log('Description: ' + results[i].description);
  //     console.log('Category: ' + results[i].category);
  //     }
  // });
});

// TODO: Populate the database with entries upon app start

// Send user search parameters to server 
app.post('/VPResult', (req, res) => {
    
  console.log('Got a post request. Data is:');
  console.log(req.body);
  
  res.send(req.body);
});


app.get('/VPResult', (req, res) => {
  
  console.log('Got a request: ');
  console.log(req.body);
  
  // Get the search params and assign to separate variables
  const category = req.body.category;
  const searchTerm = req.body.searchTerm;
  
  // Represents the SQL query to run to get the relevant posts from database
  let getPosts;

  // User clicked search button without any params. Display all posts from database
  if (searchTerm == '' && category == '' ) {
      getPosts = 'SELECT * FROM `csc648-team1-db`.`Posts`';
  }
  // User entered a search term and selected a category
  else if (searchTerm != '' && category != '') {
      getPosts = `SELECT * FROM Posts WHERE fk_category = '` + category + `' AND 
      ( title LIKE '%` + searchTerm + `%' OR description LIKE '%` + searchTerm + `%')`;
  }
  // User entered a search term but did not select a category
  else if (searchTerm != '' && category == '') {
      getPosts = `SELECT * FROM Posts WHERE title LIKE '%` + searchTerm + `%' OR 
      description LIKE '%` + searchTerm + `%')`;
  }
  // User did not enter a search term but selected a category
  else if (searchTerm == '' && category != '') {
      getPosts = `SELECT * FROM Posts WHERE fk_category = '` + category + `'`;
  }
  // Extract posts from Posts table in database based on user's search params 
  database.query(getPosts, function (error, results) {
      if (error) {
          console.error('Error querying database: ' + error.stack);
          return;
      }
      // Store the list of search results to send over to the VP Result page
      let searchResults = [];
      // For every search result, create a post object containing relevant post info to display
      for (let i = 0; i < results.length; i++) {
          let post = {
            category: results[i].category,
            image: results[i].photo_path,
            title: results[i].title,
            price: results[i].price,
            description: results[i].description
          }
          console.log('Post sent over is: ');
          console.log(post.category);
          console.log(post.image);
          console.log(post.title);
          console.log(post.price);
          console.log(post.description);
          // Add the post to the list of search results
          searchResults.push(post);
      }
      // Send the list of search results to the VP Result page to display
      res.send(searchResults);
  });
  console.log('Finished sending database results');
});



app.listen(port, () => console.log(`Server is listening on port ${port}`));