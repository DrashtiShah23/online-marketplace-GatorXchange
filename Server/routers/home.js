const express = require('express');
const router = express.Router();
const store = []




router.get('/', (req, res) => {
    const a = { "testing!": 90, "testing2": 80, "testing3": 89 }
    res.send("hi: " + a)
    console.log(a)
    store.push(a)

})
router.get('/test_get', (req, res) => {
    console.log("to the get: " + store)
    res.send("hi test: " + store)
})



module.exports = router;