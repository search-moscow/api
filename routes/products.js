var ProductController = require('../controllers/product.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', ProductController.index);
// router.get('/gethome', ProductController.gethome);
router.get('/read/:id', ProductController.single);

module.exports = router;