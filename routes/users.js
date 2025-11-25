// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    const username = req.body.username
    const first = req.body.first
    const last = req.body.last
    const email = req.body.email
    const plainPassword = req.body.password

    bcrypt.hash(plainPassword, saltRounds, function(err,hashedPassword) {
        if (err) {
            return next (err)
        }

        let sqlquery = "INSERT INTO users(username, first_name, last_name, email, password) VALUES (?,?,?,?,?)" 
        let newrecord = [username, first, last, email, hashedPassword];

        db.query(sqlquery, newrecord,(err,result) =>{
        if(err) {
            return next(err);
        }

    // saving data in database
            res.send(
                'Hello ' + first + ' ' + last + 
                '! You are now registered. We will send an email to ' + email); 
        });        
    });
}); 

// Export the router object so index.js can access it
module.exports = router