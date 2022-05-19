/*********************************************************************
 * Purpose: Starts the express app server to listen on port 3001 and
 * contains all the API endpoints to call from the frontend. Also
 * connects to the database upon starting and includes database logic
 * for retrieving data from the MySQL database
 * Input: None
 * Output: Express app startup, database connection, and all backend
 * functionality
 * Error Messages: None
 * Authors: Thomas Nguyen and Javier Marquez
 *********************************************************************/
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const socketio = require("socket.io");
// const helmet = require('helmet');
const logger = require("morgan");
const bcrypt = require("bcrypt");
const path = require('path');
const database = require('./config/database.js');
const app = express();
const PORT = 3001;

//const { Server } = require("socket.io")

/* Routers */
// const homeRouter = require('./routers/home.js')
// const usersRouter = require('./routers/users.js')
// const VpRouter = require('./routers/VPResult.js')
const uploadRouter = require('./routers/upload.js');
// const chatRouter = require('./routers/chat.js')
// const http = require("http")

// const server = http.createServer(app)
// const config = require('./config/database.js')
// const router = express.Router()


// const { Server } = require("socket.io")
// const http = require("http")
// const server = http.createServer(app)
// const config = require('./database/database.js')
// const PORT = 80


// Use express middleware to parse req body into json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(helmet());
app.use(logger('dev'));


// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "UPDATE"],
//     credentials: true,
//   })
// );

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     // cookie: {
//     //   expires: 60 * 60 * 24,
//   },
//   )
// );

// Test endpoint for testing post in backend. Ignore
app.post('/test', (req, res) => {
  console.log(req.body);
  //res.send('Sending a name and email to server: ' + req.body.name + ', ' + req.body.email);
  console.log('Sending a name and email to server');

  const saltRounds = 10;
  bcrypt.hash(req.body.name, saltRounds)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      res.send(hashedPassword);
  });
});

// Test endpoint for testing get in backend. Ignore
app.get('/test', (req, res) => {
  console.log('Name is: ' + req.body.name);
  console.log('Email is: ' + req.body.email);
  res.send('Data retrieved from server: ' + req.body.name + ', ' + req.body.email);
});

// Registration endpoint
app.post("/register", (req, res) => {
  // Get the account information
  const sfsu_id = req.body.sfsu_id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  // Verify frontend data is correct
  console.log();
  console.log('SFSU ID received: ' + sfsu_id);
  console.log('Username received: ' + username);
  console.log('Email received: ' + email);
  console.log('Password received: ' + password);
  console.log();

  
  // Auto generate the salt and hash the password
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      // Create the SQL insert statement
      const createUser = 
        `INSERT INTO users
        (sfsu_id, username, email, password, registered)` + `VALUES (?, ?, ?, ?, 1)`;
      
      // Insert new user account into database
      database.query(createUser, [sfsu_id, username, email, hashedPassword, 1])
        .then(([results]) => {
          // Account created successfully
          if (results && results.affectedRows) {
            console.log('Account created successfully!');
            res.status(200).send('Account created successfully!');
          }
          // Account already exists
          else {
            console.log('Account already exists. Create an account with different information.');
            res.status(404).send('Account already exists. Create an account with different information.');
          }
        })
        .catch((err) => {
          console.log('Error creating account in database with account info: ');
          console.log(err);
          return;
        });
    })
    .catch((err) => {
      console.log('Error hashing password: ');
      console.log(err);
      res.status(404).send('Error hashing password');
    });
});

// Login endpoint
// TODO: Setup session and cookies for login
app.post("/login", (req, res) => {
  // Get login info
  const email = req.body.email;
  const password = req.body.password;

  // Create the SQL query
  const findUser =
    `SELECT email, password 
    FROM users 
    WHERE email = '` + email + `' 
    AND password = '` + password + `'`;

  // Check the database whether an account with the username and password entered exists
  database.query(findUser)
    .then(([results]) => {
      // Valid login info
      if (results.length == 1) {
        console.log('Account exists. Logging user in...');
        res.status(200).send('Account exists. Logging user in...');
      }
      // Invalid login info
      else {
        console.log('Account does not exist. Make sure your information is correct or create an account.');
        res.status(404).send('Account does not exist. Make sure your information is correct or create an account.');
      }
    })
    .catch((err) => {
      console.log('Error querying database with login info:');
      console.log(err);
      return;
    });

});

// This endpoint gets all search results to display on home page
app.get('/getAllPosts', (req, res) => {
  const getAllPosts = 
    `SELECT * FROM posts 
    INNER JOIN categories 
    ON posts.fk_category_id = categories.category_id`;
  database.execute(getAllPosts)
    .then(([results]) => {
      const allPosts = [];
      // Setup each post as an object to add to the allPosts array 
      for (let i = 0; i < results.length; i++) {
        let post = {
          category: results[i].category,
          image: results[i].photo_path,
          thumbnail: results[i].thumbnail,
          title: results[i].title,
          price: results[i].price,
          description: results[i].description,
          pickup_location: results[i].pickup_location,
          dateTime: results[i].created
        };
        console.log();
        console.log(`Post ${i} sent over is: `);
        console.log('Post category: ' + post.category);
        console.log('Post image: ' + post.image);
        console.log('Post thumbnail: ' + post.thumbnail);
        console.log('Post title: ' + post.title);
        console.log('Post price: ' + post.price);
        console.log('Post description: ' + post.description);
        console.log('Post pickup location: ' + post.pickup_location);
        console.log('Post creation date/time: ' + post.dateTime);
        console.log();
        // Add the post to the allPosts array 
        allPosts.push(post);
      }
      // Send the allPosts array over to client
      console.log('Array containing all posts is: ' + JSON.stringify(allPosts));
      res.status(200).send(JSON.stringify(allPosts));
      console.log('Finished sending all posts over to client!');
    })
    .catch((err) => {
      console.log('Error getting all database posts');
      console.log(err);
      res.status(404).send('Error getting all database posts');
    });
});


// This store variable will store all user search parameters globally
let store = [];

// Send user search parameters to server 
app.post('/search', (req, res) => {
  console.log();
  console.log('Got a post request. Request body is:');
  console.log(req.body);
  console.log('Posted category: ' + req.body.category);
  console.log('Posted search term: ' + req.body.searchTerm);
  store.push(req.body);
  res.sendStatus(200);
  
});

// Get the search params and assign to separate variables
app.get('/search', (req, res) => {
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
    getPosts = 
      `SELECT * 
      FROM posts
      INNER JOIN categories
      ON posts.fk_category_id = categories.category_id`;
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
    getPosts = 
      `SELECT * 
      FROM posts 
      INNER JOIN categories
      ON posts.fk_category_id = categories.category_id
      WHERE title LIKE '%` + searchTerm + `%' OR 
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

  // Store the list of search results to send over to the Search Results page
  let searchResults = [];

  // Extract posts from posts table in database based on user's search params
  // TODO: Refactor the query into a execute statement so that it is cached, resulting in faster performance   
  database.query(getPosts)
    .then(([results]) => {
      // For every search result, create a post object containing relevant post info to display
      for (let i = 0; i < results.length; i++) {
        let post = {
          category: results[i].category,
          image: results[i].photo_path,
          thumbnail: results[i].thumbnail,
          title: results[i].title,
          price: results[i].price,
          description: results[i].description,
          pickup_location: results[i].pickup_location,
          dateTime: results[i].created
        };
        console.log();
        console.log(`Post ${i} sent over is: `);
        console.log('Post category: ' + post.category);
        console.log('Post image: ' + post.image);
        console.log('Post thumbnail: ' + post.thumbnail);
        console.log('Post title: ' + post.title);
        console.log('Post price: ' + post.price);
        console.log('Post description: ' + post.description);
        console.log('Post pickup location: ' + post.pickup_location);
        console.log('Post creation date/time: ' + post.dateTime);
        console.log();
        // Add the post to the list of search results
        console.log("posts: ", post) 
        searchResults.push(post);
      }

        console.log('Database results array is: ' + JSON.stringify(searchResults));
  
        // Send the database results to the frontend
        res.send(JSON.stringify(searchResults));
        console.log('Finished sending database results');
    })
    .catch((err) => {
        console.error('Error querying database: ');
        console.log(err.stack);
        return;
    });


});
/*  Socket communication with Server */

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],

//   },
// });



// io.on('connection', async (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//   socket.emit('Welcome', 'pogi');
  
//   socket.on('Disconnect', async () => {
//     console.log('User disconnected', socket.id);
//     socket.broadcast.emit('chat-message', socket.id);
//   });
// });


/* Routers */
// app.use('/home', homeRouter);
// app.use('/user', usersRouter);
// app.use('/vpresult', VpRouter);
app.use('/upload', uploadRouter);
// app.use('/chat', chatRouter);

/*************************************************************************** 
  VERY IMPORTANT DO NOT CHANGE THE CODE BLOCK BELOW. DEPLOYING TO
  PRODUCTION WILL NOT WORK WITHOUT THIS CODE 

  Configures the server so that requests to any route is served the 
  index.html file in the client production build folder

***************************************************************************/
app.use('public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

// Respond to any route requests with the index.html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

/*************************************************************************** 
  VERY IMPORTANT DO NOT CHANGE THE ABOVE CODE BLOCK. DEPLOYING TO
  PRODUCTION WILL NOT WORK WITHOUT THIS CODE

***************************************************************************/

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


// server.listen(PORT, async () => {
//   console.log(`server is running on port ${PORT}`)
// })
