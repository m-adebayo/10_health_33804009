// Create a new router
const express = require("express");
const { console } = require("inspector");
const router = express.Router()

const redirectLogin = (req,res,next) => req.app.locals.redirectLogin(req,res,next);

router.get('/search', redirectLogin, function(req, res, next){
    res.render("search.ejs")
});

router.get('/search_result', function (req, res, next) {
    //searching in the database
    const searchTerm = req.query.search_text;

    if (!searchTerm) {
        return res.send("Please enter a search term.");
    }

    const sql = "SELECT * FROM meals WHERE name LIKE ? or ingredients LIKE ?";
    const value = `%${searchTerm}%`;

    db.query(sql, [value,value], (err, result) => {
        if (err) throw err;
        res.render("search_result.ejs", { searchTerm: searchTerm, meals: result });
    });
});

    router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT * FROM meals"; 
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {listedMeals: result});
         });
    });

// Show the add meal page
router.get('/addmeal', redirectLogin, (req, res) => {
    res.render('addmeal'); // render the EJS form
});

// Handle form submission and save meal to database
router.post('/mealadded', (req, res, next) => {
    const sqlquery = "INSERT INTO meals (name, description, ingredients, recipe) VALUES (?, ?, ?, ?)";
    const newrecord = [req.body.name, req.body.description, req.body.ingredients, req.body.recipe];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.send('This meal is added to the database! <br>' +
                     'Name: ' + req.body.name + '<br>' +
                     'Description: ' + req.body.description + '<br>' +
                     'Ingredients: ' + req.body.ingredients + '<br>' +
                     'Recipe: ' + req.body.recipe);
        }
    });
});

module.exports = router;



// Export the router object so index.js can access it
module.exports = router