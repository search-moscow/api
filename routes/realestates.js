var RealestateController = require('../controllers/realestate.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', RealestateController.index);
router.get('/gethome', RealestateController.gethome);
router.get('/read/:id', RealestateController.single);

module.exports = router;