const express = require('express')
const router = express.Router();

const store = []



router.get('/VPResult', (req, res) => {
   
  a = { "testing!": 90, "testing2":80, "testing3":89 }
  res.send("hi: " + a)
  console.log(a) 
  store.push(a) 
  
});

router.get('/VPResult_getTest', (req, res) => {
  console.log("to the get: " + store)
  res.send(store) 
});

module.exports = router;