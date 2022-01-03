var ProductController = require('../controllers/product.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', ProductController.findAll);
router.get('/home', ProductController.findHome);
router.get('/last', ProductController.findLast);
router.get('/one/:id', ProductController.findOne);

module.exports = router;