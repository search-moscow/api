var DistrictController = require('../controllers/district.controller');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', DistrictController.index);
router.get('/read/:id', DistrictController.single);
module.exports = router;