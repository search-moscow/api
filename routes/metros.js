var MetroController = require('../controllers/metro.controller');
var AuthController = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, MetroController.create);
router.get('/read', MetroController.index);
router.post('/update', AuthController.access, MetroController.update);
router.post('/delete', AuthController.access, MetroController.delete);
router.get('/read/:id', MetroController.single);
module.exports = router;