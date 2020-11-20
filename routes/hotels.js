var HotelController = require('../controllers/hotel.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', HotelController.index);
router.get('/gethome', HotelController.gethome);
router.get('/read/:id', HotelController.single);

module.exports = router;