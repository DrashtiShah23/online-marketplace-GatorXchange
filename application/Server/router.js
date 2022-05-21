const express = require('express');
const Router = express.Router();
// const { userchat } = require('../ChatData');


Router.get('/', (req, res) => {
    res.send("server is up and running")
})
// app.get('/chat/api', (req, res) => {
//     console.log('im here')
//     res.send(userchat)
// });
// app.get('/chat/api/:id', (req, res) => {

//     const singleChat =
//         userchat.find((c) => c._id === req.params.id);
//     res.send(singleChat);

// });

module.exports = Router;