var RestaurantController = require('../controllers/restaurant.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', RestaurantController.index);
router.get('/getSortUp', RestaurantController.getSortUp);
router.get('/getSortDown', RestaurantController.getSortDown);
router.get('/read/:id', RestaurantController.single);
router.get('/getfilterbyprice', RestaurantController.filter);

module.exports = router;