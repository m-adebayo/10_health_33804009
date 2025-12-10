// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
const path = require('path')
var mysql = require('mysql2')
require('dotenv').config();
var session = require('express-session')

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

app.locals.redirectLogin = redirectLogin;

app.use((req, res, next) => {
    res.locals.username = req.session.username || null;
    res.locals.userId = req.session.userId || null;
    next();
});


// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))



// Define our application-specific data
app.locals.siteData = {siteName: "FreshForks"}

// Define the database connection pool
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
global.db = db;


// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /meals
const mealsRoutes = require('./routes/meals')
app.use('/meals', mealsRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))