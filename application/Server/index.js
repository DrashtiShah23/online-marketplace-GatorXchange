const dotenv = require("dotenv")
dotenv.config()
require('dotenv').config();
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")
const socketio = require("socket.io")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")
const mysql = require("mysql2")
const homeRouter = require('./routers/home.js')
const usersRouter = require('./routers/users.js')
const VpRouter = require('./routers/VPResult.js')
const uploadRouter = require('./routers/upload.js')
const app = express();

// const config = require('./database/database.js')
// const router = express.Router()
const PORT = 3001
// app.use(express.static(path.join(__dirname, 'build')));




app.use(helmet())
app.use(morgan("common"))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
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






// Create a connection to the database using account info
const database = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
});





app.use('/home', homeRouter)
app.use('/user', usersRouter)
app.use('/vpresult', VpRouter)
app.use('/upload', uploadRouter)


app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`)
});

