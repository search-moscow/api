var CategoryController = require('../controllers/category.controller');
var AuthController = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, CategoryController.create);
router.get('/read', CategoryController.index);
router.post('/update', AuthController.access, CategoryController.update);
router.post('/delete', AuthController.access, CategoryController.delete);

module.exports = router;