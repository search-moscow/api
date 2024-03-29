var RestaurantController = require('../controllers/restaurant.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', RestaurantController.findAll);
router.get('/home', RestaurantController.findHome);
router.get('/last', RestaurantController.findLast);
router.get('/one/:id', RestaurantController.findOne);
// router.get('/getSortUp', RestaurantController.getSortUp);
// router.get('/getSortDown', RestaurantController.getSortDown);
// router.get('/getfilterbyprice', RestaurantController.filter);

module.exports = router;