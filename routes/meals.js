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
            res.render("meal_added.ejs", {
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe
            });        }
    });
});

router.get('/:meal_id', function(req, res, next) {
    const meal_id = req.params.meal_id;

    const mealSql = "SELECT * FROM meals WHERE id = ?";
    const ratingsSql = `
        SELECT ratings.*, users.username
        FROM ratings
        JOIN users ON ratings.user_id = users.id
        WHERE meal_id = ?
    `;
    const avgSql = "SELECT AVG(rating) AS avgRating FROM ratings WHERE meal_id = ?";

    db.query(mealSql, [meal_id], (err, mealResult) => {
        if (err) return next(err);
        if (mealResult.length === 0) {
            return res.send("Meal not found.");
        }

        db.query(ratingsSql, [meal_id], (err, ratingsResult) => {
            if (err) return next(err);

            db.query(avgSql, [meal_id], (err, avgResult) => {
                if (err) return next(err);

                let avgRating = avgResult[0].avgRating;

                if (avgRating !== null){
                    avgRating = Number (avgRating);
                }
                res.render("meal_details.ejs", {
                    meal: mealResult[0],
                    ratings: ratingsResult,
                    avgRating: avgRating,
                    successMessage: req.session.successMessage || null
                });
            });
        });
    });
});

router.post('/:meal_id/rate', redirectLogin, (req,res,next) => {
    const meal_id = req.params.meal_id;
    const user_id = req.session.userId;
    const rating = parseInt(req.body.rating);
    const comment = req.body.comment || null;

    if (!rating || rating < 1 || rating > 5){
        return res.send("Rating must be a number from  1-5.")
    }

    const sql = `INSERT INTO ratings (user_id, meal_id, rating, comment)
                VALUES(?,?,?,?)
                ON DUPLICATE KEY UPDATE
                rating = VALUES(rating),
                comment = VALUES(comment),
                updated_at = CURRENT_TIMESTAMP
                `;
    
    const params = [user_id, meal_id, rating, comment];
    db.query(sql,params,(err,result) => {
        if (err) return next (err);

    req.session.successMessage = "Your rating has been saved!";
    res.redirect("/meals/" + meal_id);
    })
})

// Export the router object so index.js can access it
module.exports = router