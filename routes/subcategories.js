var SubcategoryController = require('../controllers/subcategory.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', SubcategoryController.index);
router.get('/read/:id', SubcategoryController.single);
module.exports = router;