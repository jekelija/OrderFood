var express = require('express');
var router = express.Router();

var Order = require('../models/Order.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

/* GET view order page. */
router.get('/cook', function(req, res, next) {
  res.render('pages/orders');
});

/* GET orders */
router.get('/orders', function(req, res, next) {
    Order.find(function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

/* POST order */
router.post('/orders', function(req, res, next) {
    console.log('Adding name ' + req.body);
    var order = new Order(
        {
            name: req.body.name,
            notes: req.body.notes,
            orders: req.body.orders
        }
    );
   
    //save actually places it in DB
    order.save(function (err) {
        if (err) {
            res.json({
                success: false,
                message: 'Cannot save order ' + req.body.username + ' to database... go find Jon!!!'
            });
        }
        else {
            res.json({
                success: true,
                message: 'Successfully completed order!!!'
            });
        }
    })
});

module.exports = router;
