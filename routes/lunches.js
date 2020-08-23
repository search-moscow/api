var LunchController = require('../controllers/lunch.controller');
var AuthController = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', LunchController.create);
router.get('/read', LunchController.index);
router.get('/gethome', LunchController.gethome);
router.post('/update', AuthController.access, LunchController.update);
router.post('/delete', AuthController.access, LunchController.delete);
router.post('/enable', AuthController.access, LunchController.enable);
router.post('/disable', AuthController.access, LunchController.disable);

router.get('/read/:id', LunchController.single);

module.exports = router;