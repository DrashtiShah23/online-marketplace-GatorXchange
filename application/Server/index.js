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
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const mySQLSession = require('express-mysql-session')(session);
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
// app.use(cookieParser());
// app.use(helmet());
app.use(logger('dev'));

let mySQLSessionStore = new mySQLSession({}, database);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE"],
    credentials: true,
  })
);

app.use(
  session({
    key: 'user_id',
    secret: 'csc648',
    store: mySQLSessionStore,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   expires: 60 * 60 * 24,
  },
  )
);

// Maintain user session while logged in
app.use((req, res, next) => {
  if (req.session.user_id) {
    res.locals.logged = true;
  }
    
  next();
});

// Test endpoint for testing post in backend. Ignore
app.post('/test', (req, res) => {
  console.log(req.body.password);
  
  console.log('Sending a hashed password to server');

  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      return res.status(200).send(hashedPassword);
  });
});

// Test endpoint for testing get in backend. Ignore
app.get('/test', (req, res) => {
  console.log('Name is: ' + req.body.name);
  console.log('Email is: ' + req.body.email);
  return res.status(200).send('Data retrieved from server: ' + req.body.name + ', ' + req.body.email);
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
      // Prepare the SQL insert query
      const createUser = 
        `INSERT INTO users
        (sfsu_id, username, email, password)` + `VALUES (?, ?, ?, ?)`;
      
      // Insert new user account into database
      database.execute(createUser, [sfsu_id, username, email, hashedPassword])
        .then(([results]) => {
          // Account created successfully
          if (results && results.affectedRows) {
            console.log('Account created successfully!');
            return res.status(200).send('Account created successfully!');
          }
          // Account already exists
          else {
            console.log('Account already exists. Create an account with different information.');
            return res.status(404).send('Account already exists. Create an account with different information.');
          }
        })
        .catch((err) => {
          console.log('Error creating account in database with account info: ');
          console.log(err);
          return res.status(404).send('Error creating account in database with account info');
        });
    })
    .catch((err) => {
      console.log('Error hashing password: ');
      console.log(err);
      return res.status(404).send('Error hashing password');
    });
});

// Login endpoint
app.post("/login", (req, res) => {
  // Get login info
  const email = req.body.email;
  const password = req.body.password;

  // Prepare the SQL query to check user accounts
  const findUser =
    `SELECT user_id, username, email, password, is_admin 
    FROM users 
    WHERE email = ?`; 
    
  let user_id, username;
  
  // Check the database whether an account with the username and password entered exists
  database.execute(findUser, [email])
    .then(([results]) => {
      // Valid login info
      if (results && results.length == 1) {
        
        let passwordMatches = bcrypt.compare(password, results[0].password);
        // Create a session only if password matches
        if (passwordMatches) {
          user_id = results[0].user_id;
          username = results[0].username;
          console.log('User ID: ' + user_id);
          console.log('Username: ' + username);
  
          req.session.user_id = user_id;
          req.session.username = username;
          res.locals.logged = true;
          
          console.log(`Account exists. Logging ${username} in...`);
          // return res.status(200).send(`Account exists. Logging ${username} in...`);
          // return res.status(200).send(req.sessionID);
          return res.status(200).send(req.session);
        }

        // Invalid login info
        else {
          console.log('Account does not exist. Make sure your information is correct or create an account.');
          return res.status(404).send('Account does not exist. Make sure your information is correct or create an account.');
        }
      }
      
    })
    .catch((err) => {
      console.log('Error querying database with login info:');
      console.log(err);
      return res.status(404).send('Error querying database with login info:');
    });

});

app.get('/login', (req, res) => {
  
  console.log('Grabbing session data:');
  console.log(req.session);
  res.status(200).send(req.session);
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Destroy the user session when logging out
  req.session.destroy((err) => {
    // Error
    if (err) {
      console.log('Error: Session could not be destroyed');
      console.log(err);
    } // Success
    else {
      console.log('Session destroyed successfully. User is logged out');
      res.clearCookie('user_id');
      res.status(200).send('User is now logged out');
    }
  });
});

// Admin endpoint to get all pending user posts
app.get('/getPendingPosts', (req, res) => {
  
  // Prepare the SQL query
  const getPendingPosts = 
    `SELECT * FROM posts
     WHERE active = ?`;
  
  // Get all pending posts from database
  database.execute(getPendingPosts, [0])
    .then(([results]) => {
      let pendingPosts = [];
      // For every search result, create a post object containing relevant post info to display
      for (let i = 0; i < results.length; i++) {
        let post = {
          post_id: results[i].post_id,
          index: i,
          category: results[i].category,
          thumbnail: results[i].thumbnail,
          title: results[i].title,
          price: results[i].price,
          description: results[i].description,
          pickup_location: results[i].pickup_location,
          dateTime: results[i].created
        };

        // Add the post to the list of pending posts
        pendingPosts.push(post);
      }

        // console.log('Pending posts array is: ' + JSON.stringify(pendingPosts));
  
        // Send the database results to the frontend
        console.log('Finished sending pending posts');
        return res.status(200).send(JSON.stringify(pendingPosts));
        
    })
    .catch((err) => {
        console.error('Error querying database: ');
        console.log(err.stack);
        return res.status(404).send('Error querying database');
    });
});

// Admin endpoint to approve pending user posts
app.put('/approvePendingPosts', (req, res) => {
  
  const post_id = req.body.post_id;
  console.log('Pending Post ID: ' + post_id);

  // Prepare the SQL query
  const approvePendingPosts = 
    `Update posts
     SET active = ?
     WHERE post_id = ?`;
  
  // Update pending post to active post in database
  database.execute(approvePendingPosts, [1, post_id])
    .then(([results]) => {
      // Post was approved
      if (results && results.affectedRows) {
        console.log('Post approved by admin!');
        return res.status(200).send('Post approved by admin!');
      }

    })
    // Error approving post
    .catch((err) => {
      console.log('Error approving post: ');
      console.log(err);
      return res.status(404).send('Error approving post ');
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
        // Add the post to the allPosts array 
        allPosts.push(post);
      }
      // Send the allPosts array over to client
      console.log('Finished sending all posts over to client!');
      return res.status(200).send(JSON.stringify(allPosts));
      
    })
    .catch((err) => {
      console.log('Error getting all database posts');
      console.log(err);
      return res.status(404).send('Error getting all database posts');
    });
});


// This store variable will store all user search parameters globally
let store = [];

// Send user search parameters to server 
app.post('/search', (req, res) => {
  
  console.log('Posted category: ' + req.body.category);
  console.log('Posted search term: ' + req.body.searchTerm);
  store.push(req.body);
  return res.sendStatus(200);
  
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
  let searchResults = [];

  // User clicked search button without any params. Display all posts from database
  if (searchTerm == '' && category == '' ) {
    // Prepare the SQL query with placeholder values
    getPosts = 
      `SELECT * 
      FROM posts
      INNER JOIN categories
      ON posts.fk_category_id = categories.category_id
      WHERE active = ?`;

    // Run the query to get all active posts
    database.execute(getPosts, [1])
      .then(([results]) => {
        // For every search result, create a post object containing relevant post info to display
        for (let i = 0; i < results.length; i++) {
          let post = {
            post_id: results[i].post_id,
            category: results[i].category,
            image: results[i].photo_path,
            thumbnail: results[i].thumbnail,
            title: results[i].title,
            price: results[i].price,
            description: results[i].description,
            pickup_location: results[i].pickup_location,
            dateTime: results[i].created
          };

          // Add the post to the list of search results
          searchResults.push(post);
        }

        console.log('Database results array is: ' + JSON.stringify(searchResults));
  
        // Send the database results to the frontend
        console.log('Finished sending database results');
        return res.status(200).send(JSON.stringify(searchResults));
    })
    .catch((err) => {
        console.error('Error querying database: ');
        console.log(err.stack);
        return res.status(404).send('Error querying database: ' + err.stack);
    });
  }
  // User entered both a search term and selected a category
  else if (searchTerm != '' && category != '') {
    // Prepare the SQL query with placeholder values
    getPosts =
      `SELECT * 
      FROM posts 
      INNER JOIN categories 
      ON posts.fk_category_id = categories.category_id
      WHERE (active = ?
      AND category = ?
      AND (title LIKE ?
      OR description LIKE ?))`;
    
    // Run the query to get active posts matching both the search term and category
    let sqlReadySearchTerm = '%' + searchTerm + '%';
    database.execute(getPosts, [1, category, sqlReadySearchTerm, sqlReadySearchTerm])
      .then(([results]) => {
        // For every search result, create a post object containing relevant post info to display
        for (let i = 0; i < results.length; i++) {
          let post = {
            post_id: results[i].post_id,
            category: results[i].category,
            image: results[i].photo_path,
            thumbnail: results[i].thumbnail,
            title: results[i].title,
            price: results[i].price,
            description: results[i].description,
            pickup_location: results[i].pickup_location,
            dateTime: results[i].created
          };

          // Add the post to the list of search results) 
          searchResults.push(post);
      }

        console.log('Database results array is: ' + JSON.stringify(searchResults));
  
        // Send the database results to the frontend
        console.log('Finished sending database results');
        return res.status(200).send(JSON.stringify(searchResults));
    })
    .catch((err) => {
        console.error('Error querying database: ');
        console.log(err.stack);
        return res.status(404).send('Error querying database: ' + err.stack);
    });
  }
  
  // User entered a search term but did not select a category
  else if (searchTerm != '' && category == '') {
    // Prepare the SQL query with placeholder values
    getPosts = 
      `SELECT * 
      FROM posts 
      INNER JOIN categories
      ON posts.fk_category_id = categories.category_id
      WHERE (active = ?
      AND (title LIKE ?
      OR description LIKE ?))`;
    
    // Run the query to get active posts matching the search term
    let sqlReadySearchTerm = '%' + searchTerm + '%';
    database.execute(getPosts, [1, sqlReadySearchTerm, sqlReadySearchTerm])
      .then(([results]) => {
        // For every search result, create a post object containing relevant post info to display
      for (let i = 0; i < results.length; i++) {
        let post = {
          post_id: results[i].post_id,
          category: results[i].category,
          image: results[i].photo_path,
          thumbnail: results[i].thumbnail,
          title: results[i].title,
          price: results[i].price,
          description: results[i].description,
          pickup_location: results[i].pickup_location,
          dateTime: results[i].created
        };

        // Add the post to the list of search results
        searchResults.push(post);
      }

        // console.log('Database results array is: ' + JSON.stringify(searchResults));

        // Send the database results to the frontend
        console.log('Finished sending database results');
        return res.status(200).send(JSON.stringify(searchResults));
    })
    .catch((err) => {
        console.error('Error querying database: ');
        console.log(err.stack);
        return res.status(404).send('Error querying database: ' + err.stack);
    });
  }
  // User did not enter a search term but selected a category
  else if (searchTerm == '' && category != '') {
    // Prepare the SQL query with placeholder values
    getPosts =
      `SELECT * 
      FROM posts 
      INNER JOIN categories 
      ON posts.fk_category_id = categories.category_id
      WHERE category = ?
      AND active = ?`;
    
    // Run the query to get active posts matching the category
    database.execute(getPosts, [category, 1])
      .then(([results]) => {
        // For every search result, create a post object containing relevant post info to display
        for (let i = 0; i < results.length; i++) {
          let post = {
            post_id: results[i].post_id,
            category: results[i].category,
            image: results[i].photo_path,
            thumbnail: results[i].thumbnail,
            title: results[i].title,
            price: results[i].price,
            description: results[i].description,
            pickup_location: results[i].pickup_location,
            dateTime: results[i].created
          };

          // Add the post to the list of search results
          searchResults.push(post);
      }

          // console.log('Database results array is: ' + JSON.stringify(searchResults));

          // Send the database results to the frontend
          console.log('Finished sending database results');
          return res.status(200).send(JSON.stringify(searchResults));
      })
      .catch((err) => {
          console.error('Error querying database: ');
          console.log(err.stack);
          return res.status(404).send('Error querying database: ' + err.stack);
      });
  }
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
