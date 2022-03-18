const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")
const socketio = require("socket.io")


const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.send('Hello World!');
});


app.use(express.json());
app.use(cookieParser());



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "UPDATE"],
//     credentials: true,
//   })
// );

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




app.listen(3001, () => {
  console.log("server is running on port 3001")
});

