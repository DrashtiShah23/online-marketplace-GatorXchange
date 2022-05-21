const express = require('express')
const bcrypt = require('bcrypt')
const config = require('../config/database')
const mysql = require("mysql2")

const router = express.Router();
const database = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME

    // Hard coding the MySQL credentials for build version
    // user: "admin",
    // host: "localhost",
    // password: "team1",
    // database: "csc648-team1-db"
});




// router.get('/', async (req, res) => {
//     res.send("USERS SERVER")
// })



router.post('/register', async (req, res) => {
    let firstname = req.body.firstName
    let lastname = req.body.lastName
    let username = req.body.Username
    let password = req.body.Password
    let email = req.body.Email
    let gender = req.body.Gender
    let bio = req.body.bio
    let saltRounds = 10



    try {
        const hash_password = await bcrypt.hash(password, saltRounds)

        //Fix this date
        const date = (new Date()).toString()

        hardcode_date = "2011-12-22 01:49:01"

        const result = await db_pool.query(
            "INSERT INTO User SET firstName = ?, lastName = ?, email = ?, gender = ?, bio = ? , createdAt = ?, userName = ?, password = ?",
            [firstname, lastname, email, gender, bio, hardcode_date, username, hash_password]
        )

        if (result[0].length < 1) {
            throw new Error(
                `Failed to create a new user ${username}`
            );
        }
        else {
            res.status(200).send(user)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server error Occured")
    }

})


router.post('/login', async (req, res) => {
    let username = req.body.Username
    let password = req.body.Password


    try {
        const result = await db_pool.query(
            "SELECT * FROM User WHERE userName = ?"
            [username]
        )

        if (result[0].length === 1) {
            const comparison = await bcrypt.compare(password, result[0][0].password)
            if (comparison) {
                res.status(200).send(users)
                return result[0][0];
            }
            else {
                throw new Error(
                    `Username and password do not match`
                );
            }
        }
        else {
            throw new Error(
                `Username does not exist`
            )
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server error Occured")
    }

})


router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(`Error: ${err}`)
            res.status(500).send("Internal Server error Occured")
        }
    })
})

module.exports = router 
