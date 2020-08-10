var OwnerController = require('../controllers/owner.controller');
var AuthController = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, OwnerController.create);
router.get('/read', OwnerController.index);
router.post('/update', AuthController.access, OwnerController.update);
router.post('/delete', AuthController.access, OwnerController.delete);
router.get('/read/:id', OwnerController.single);
module.exports = router;