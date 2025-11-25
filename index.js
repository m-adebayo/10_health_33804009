// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
const path = require('path')
var mysql = require('mysql2')

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))

// Define our application-specific data
app.locals.siteData = {siteName: "FreshForks"}

// Define the database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'health_app',
    password: 'qwertyuiop',
    database: 'health',
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