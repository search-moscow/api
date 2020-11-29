var HouseController = require('../controllers/house.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', HouseController.index);
router.get('/gethome', HouseController.gethome);
router.get('/getSortUp', HouseController.getSortUp);
router.get('/getSortDown', HouseController.getSortDown);
router.get('/read/:id', HouseController.single);
router.get('/getfilterbyprice', HouseController.filter);

module.exports = router;