var LunchController = require('../controllers/lunch.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// router.post('/create', LunchController.create);
router.get('/read', LunchController.index);
// router.get('/gethome', LunchController.gethome);

router.get('/read/:id', LunchController.single);
router.get('/getby/:id', LunchController.getBy);

module.exports = router;