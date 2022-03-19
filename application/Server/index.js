const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")
const socketio = require("socket.io")

const homeRouter = require('./routes.js')


const app = express();
// app.use(express.static(path.join(__dirname, 'build')));




app.get('/*', function (req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  //res.send('Hello World!');
  console.log(req.body)
  res.json("Hello: " + req.body) 
});


app.use(express.json());
app.use(cookieParser());



app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
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
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


app.post("/register", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.Email;
  const username = req.body.Username
  const password = req.body.passWord;



})


app.post("/login", (req, res) => {
  const username = req.body.Username;
  const password = req.body.passWord;


})


app.post('/test', (req, res) => {
  req.body.name = '123'
  req.body.email = '123@mail'
  res.send(req.body);
  console.log('Sent a message');
})

app.get('/test', (req, res) => {
  res.send('got the data: ' + req.body.name);
  console.log(req.body.name);
})



app.use('/VPResult_getTest', homeRouter);


require('dotenv').config();
const mysql = require("mysql");


// Use express middleware to parse req body into json




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

// const store = [] 
// // Send user search parameters to server 
// app.post('/VPResult', (req, res) => {
   
//   console.log('Posted data. Data is:');
//   console.log(req.body);

//   res.json(req.body);
//   store.push(req.body) 
  
// });

// app.get('/VPResult_getTest', (req, res) => {
//   res.send("test get" + store) 
//   console.log("result getTest: ", store) 

// }); 


// app.get('/VPResult', (req, res) => {
  
//   console.log('Got a request: ');
//   console.log(req.body);
//   // console.log(req.body.category);
//   // console.log(req.body.searchTerm);

//   // Get the search params and assign to separate variables

//   const category = req.body.category;
//   const searchTerm = req.body.searchTerm;
//   console.log(category);
//   console.log(searchTerm);
//   // Represents the SQL query to run to get the relevant posts from database
//   let getPosts;

//   // User clicked search button without any params. Display all posts from database
//   if (searchTerm == '' && category == '' ) {
//       getPosts = 'SELECT * FROM `csc648-team1-db`.`posts`';
//   }
//   // User entered a search term and selected a category
//   else if (searchTerm != '' && category != '') {
//     getPosts = 
//       `SELECT * 
//       FROM posts 
//       INNER JOIN categories 
//       ON posts.fk_category_id = categories.category_id
//       WHERE category = '` + category + `' 
//       AND ( title LIKE '%` + searchTerm + `%' 
//       OR description LIKE '%` + searchTerm + `%')`;
//   }
//   // User entered a search term but did not select a category
//   else if (searchTerm != '' && category == '') {
//       getPosts = `SELECT * FROM posts WHERE title LIKE '%` + searchTerm + `%' OR 
//       description LIKE '%` + searchTerm + `%')`;
//   }
//   // User did not enter a search term but selected a category
//   else if (searchTerm == '' && category != '') {
//     getPosts = 
//       `SELECT * 
//       FROM posts 
//       INNER JOIN categories 
//       ON posts.fk_category_id = categories.category_id
//       WHERE category = '` + category + `'`;
//   }
//   // Extract posts from Posts table in database based on user's search params 
//   database.query(getPosts, function (error, results) {
//       if (error) {
//           console.error('Error querying database: ' + error.stack);
//           return;
//       }
//       // Store the list of search results to send over to the VP Result page
//       let searchResults = [];
//       // For every search result, create a post object containing relevant post info to display
//       for (let i = 0; i < results.length; i++) {
//           let post = {
//             category: results[i].fk_category_id,
//             image: results[i].photo_path,
//             title: results[i].title,
//             price: results[i].price,
//             description: results[i].description
//           }
//           console.log('Post sent over is: ');
//           console.log(post.category);
//           console.log(post.image);
//           console.log(post.title);
//           console.log(post.price);
//           console.log(post.description);
//           // Add the post to the list of search results
//           searchResults.push(post);
//       }
//       // Send the list of search results to the VP Result page to display
//       res.send(searchResults);
//   });
//   console.log('Finished sending database results');
// });







app.listen(3001, () => {
  console.log("server is running on port 3001")
});

