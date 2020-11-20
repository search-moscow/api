var MetroController = require('../controllers/metro.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', MetroController.index);
router.get('/read/:id', MetroController.single);

module.exports = router;