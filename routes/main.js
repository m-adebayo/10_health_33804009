// Create a new router
const express = require("express")
const router = express.Router()
const redirectLogin = (req,res,next) => req.app.locals.redirectLogin(req,res,next);


//Handle the routes

router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});



module.exports = router