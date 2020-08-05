var DistrictController = require('../controllers/district.controller');
var AuthController = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, DistrictController.create);
router.get('/read', DistrictController.index);
router.post('/update', AuthController.access, DistrictController.update);
router.post('/delete', AuthController.access, DistrictController.delete);
router.get('/read/:id', DistrictController.single);
module.exports = router;