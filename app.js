const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require('./config/db')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const hbs = require('hbs');

const app = express();

connectDB()




const port = process.env.PORT || 4000;


hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "ejs");

//set public folder


//set public folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

let Product = require('./models/product');

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application json
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//passport config
require('./config/passport.js')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});



//home route
app.get('/', function(req, res){
    res.render('index')
});

//products

app.get('/allproducts', function(req, res){
    Product.find({}, function (err, products, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('all_products', {
                title: "innovate",
                products: products,
               

            });
        }

    }).sort({
        // postDate: 'desc'
    });
});

//started
app.get('/started', function(req, res){
    Product.find({}, function (err, products, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('started', {
                title: "innovate",
                products: products

            });
        }

    }).sort({
        // postDate: 'desc'
    });
});

//new sale

app.get('/newsale', function(req, res){
    Product.find({}, function (err, products, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('new_sale', {
                title: "innovate",
                products: products

            });
        }

    }).sort({
        // postDate: 'desc'
    });
});


//loginerror
app.get('/loginerror', function (req, res) {
    res.render('loginerror');
});

//hi there

//error
app.get('/error', function (req, res) {
    res.render('error');
});



let products = require('./routes/products');
let users = require('./routes/users');
app.use('/products', products);
app.use('/users', users);



app.listen(port, function(){
    console.log(`Server runing on port ${port}`);
});

