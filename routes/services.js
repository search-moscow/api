var ServiceController = require('../controllers/service.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', ServiceController.index);
router.get('/gethome', ServiceController.gethome);
router.get('/read/:id', ServiceController.single);

module.exports = router;