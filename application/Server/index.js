const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")
const socketio = require("socket.io")
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require("morgan")
const path = require('path');
// Configures database environment variables
require('dotenv').config();
const mysql = require("mysql2");
// const database = require('../config/database');

const { Server } = require("socket.io")

/* Routers */
const homeRouter = require('./routers/home.js')
const usersRouter = require('./routers/users.js')
// const VpRouter = require('./routers/VPResult.js')
const uploadRouter = require('./routers/upload.js')
// const chatRouter = require('./routers/chat.js')
const http = require("http")
const app = express();
const PORT = 3001;

const server = http.createServer(app)
const config = require('./config/database.js')
const router = express.Router()


// const { Server } = require("socket.io")
// const http = require("http")
// const server = http.createServer(app)
// const config = require('./database/database.js')
// const PORT = 80


// Use express middleware to parse req body into json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(morgan("common"))
app.use(logger("common"))


app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE"],
    credentials: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   expires: 60 * 60 * 24,
  },
  )
);



/*************************************************************************** 
  VERY IMPORTANT DO NOT CHANGE THE CODE BLOCK BELOW. DEPLOYING TO
  PRODUCTION WILL NOT WORK WITHOUT THIS CODE 

  Configures the server so that requests to any route is served the 
  index.html file in the client production build folder

***************************************************************************/
app.use('public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

// Respond to any route requests with the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

/*************************************************************************** 
  VERY IMPORTANT DO NOT CHANGE THE ABOVE CODE BLOCK. DEPLOYING TO
  PRODUCTION WILL NOT WORK WITHOUT THIS CODE

***************************************************************************/


app.post("/register", async (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.Email;
  const username = req.body.Username
  const password = req.body.passWord;

})


app.post("/login", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.passWord;

})

// Test endpoints for testing backend. Ignore
app.post('/test', (req, res) => {
  req.body.name = '123'
  req.body.email = '123@mail'
  console.log(req.body);
  res.send(req.body);
  
  console.log('Sent a name and email');
})

app.get('/test', (req, res) => {
  res.send('got a name: ' + req.query.name);
  console.log(req.query.name);
})


// Create a connection to the database using account info
const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
  
  // Hard coding the MySQL credentials for build version
  // user: "admin",
  // host: "localhost",
  // password: "team1",
  // database: "csc648-team1-db"
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
  res.send(req.body);

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
  // TODO: Refactor the query into a execute statement so that it is cached resulting in faster performance   
  database.query(getPosts, function (error, results) {
    if (error) {
        console.error('Error querying database: ' + error.stack);
        return;
    }

    // For every search result, create a post object containing relevant post info to display
    for (let i = 0; i < results.length; i++) {
      let post = {
        category: results[i].category,
        image: results[i].photo_path,
        thumbnail: results[i].thumbnail,
        title: results[i].title,
        price: results[i].price,
        description: results[i].description,
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
  
  });


});
/*  Socket communication with Server */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],

  },
});



io.on('connection', async (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.emit('Welcome', 'pogi');
  
  socket.on('Disconnect', async () => {
    console.log('User disconnected', socket.id);
    socket.broadcast.emit('chat-message', socket.id);
  });
});

/* Routers */
// app.use('/home', homeRouter);
// app.use('/user', usersRouter);
// app.use('/vpresult', VpRouter);
app.use('/upload', uploadRouter);
// app.use('/chat', chatRouter);

/* Routers */
// app.use('/home', homeRouter);
// app.use('/user', usersRouter);
// app.use('/vpresult', VpRouter);
app.use('/upload', uploadRouter);
// app.use('/chat', chatRouter);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


// server.listen(PORT, async () => {
//   console.log(`server is running on port ${PORT}`)
// })
