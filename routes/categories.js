var CategoryController = require('../controllers/category.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', CategoryController.index);
router.get('/read/:id', CategoryController.single);
module.exports = router;