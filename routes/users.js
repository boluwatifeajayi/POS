const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
let User = require('../models/user');

//Register form
router.get('/registerjoin', function(req, res){
    res.render('registerjoin')
});

//register process
router.post('/registerjoin', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    
  
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
      
      
    });

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    // req.flash('success', 'You are now registered and can log in');
                    res.redirect('/users/login');
                }
            });
        });
    });
    

    

});

//login form
router.get('/login', function(req, res){
    res.render('login');
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local',{
        successRedirect: '/started',
        failureRedirect: '/loginerror',
        // failureFlash:true
    })(req, res, next);
})

//logout
router.get('/logout', function (req, res) {
    req.logout();
    // req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});
//export

module.exports = router;