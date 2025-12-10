// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const redirectLogin = (req,res,next) => req.app.locals.redirectLogin(req,res,next);

//Registration
router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

//After Registration
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

//Log In
router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

//After Log In
router.post('/loggedin', function (req, res, next) {
    const username = req.body.username
    const plainPassword = req.body.password

    let sqlquery = "SELECT * FROM users WHERE username = ?"

    db.query(sqlquery, [username], (err, result) => {
        if (err) return next(err)

        // No user found
        if (result.length === 0) {
               return res.send('Login failed: Username not found.<a href='+'/users/login'+'>Return To Login</a>')
        }

        const hashedPassword = result[0].password

        // Compare password supplied with hashed password in the database
        bcrypt.compare(plainPassword, hashedPassword, function(err, same) {
            if (err) return next(err)

            if (same === true) {
                req.session.username = result[0].username;
                req.session.userId = result[0].id;
                return res.render("login_success.ejs", { username: username });
            } else {
                return res.send('Login failed: Incorrect password.<a href='+'/users/login'+'>Return To Login</a>')
            }
        })
    })
})

//Logout
router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
        if (err) {
          return res.redirect('/')
        }
        res.send('You are now logged out. <a href='+'/'+'>Home</a>');
        })
    })



// Export the router object so index.js can access it
module.exports = router