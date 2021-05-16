const express = require('express');
const router = express.Router();
//article model
let Product = require('../models/product');
//user model
let User = require('../models/user');



// add article route
router.get('/add', ensureAuthenticated, function (req, res) {
    res.render("add_product", {
        title: "Add product",
    });
});
//load edit form
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    Product.findById(req.params.id, function (err, product) {
         res.render("edit_product", {
            title: 'Edit product',
            product: product
        });
    });
});


// add submit POST Route
router.post('/add', function (req, res) {
    let product = new Product();
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;

    // req.flash('success', 'product Added')
    product.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/allproducts');
        }
    });

})

//update submit post

router.post("/edit/:id", function (req, res) {
    let product = {};
        product.name = req.body.name;
        product.quantity = req.body.quantity;
        product.price = req.body.price;

    let query = {
        _id: req.params.id
    }

    Product.update(query, product, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            // req.flash('success', 'Article updated');
            res.redirect("/allproducts");
        }
    });
});

//delete article

router.delete('/:id', function (req, res) {

    // if (!req.user._id) {
    //     res.status(500).send();
    // }

    let query = {
        _id: req.params.id
    }


    Product.findById(req.params.id, function (err, product) {
         
            Product.remove(query, function (err) {
                if (err) {
                    console.log(err);
                }
                res.send('Success');
            });
        
    })

});

exports.deleteProduct = function(req, res) {

    users.findOneAndRemove({
        userId: req.params.id
    }, function(err, user) {

        if (err) throw err;

        console.log("Success");

    });

    res.redirect('/admin/dashboard');

}


//get single article
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if(err){
            res.render('error');
            console.log("there was an error")
        }else{
            User.findById(product.author, function (err, user) {
                if (err) {
                    res.render("error")
                    console.log("there was an error");
                } else {
                    res.render("product", {
                        product: product,
                        // author: user.name,
                        
                    });
                }

            });
        }
        

    });
});

//access control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;