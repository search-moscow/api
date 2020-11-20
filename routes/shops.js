var ShopController = require('../controllers/shop.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', ShopController.index);
router.get('/gethome', ShopController.gethome);
router.get('/read/:id', ShopController.single);

module.exports = router;