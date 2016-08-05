var express = require('express');
var router = express.Router();

var Order = require('../models/Order.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index');
});

/* GET view order page. */
router.get('/cook', function(req, res) {
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

/** DELETE order*/
router.delete('/orders/:orderId', function(req, res) {
    Order.findOne({
        _id: req.params.orderId
    }, function(err, order) {
        if (err) {
            res.json({ success: false, message: 'Error removing order ' + req.params.orderId + '; cannot find order due to ' + err});
        }
        else if (!order) {
            res.json({ success: false, message: 'Error removing order ' + req.params.orderId + '; cannot find order, it does not exist'});
        } 
        else {
            order.remove(function(err) {
                if(err) {
                    res.json({ success: false, message: 'Error removing order ' + req.params.orderId + " due to " + err });
                }
                else {
                    res.json({ success: true });
                }
            }); 
        }
    });
});


/* POST order */
router.post('/orders', function(req, res) {
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
