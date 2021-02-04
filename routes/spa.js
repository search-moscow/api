var SpaController = require('../controllers/spa.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', SpaController.index);
router.get('/gethome', SpaController.gethome);
router.get('/getSortUp', SpaController.getSortUp);
router.get('/getSortDown', SpaController.getSortDown);
router.get('/read/:id', SpaController.single);
router.get('/getfilterbyprice', SpaController.filter);

module.exports = router;