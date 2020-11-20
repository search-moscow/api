var ActivityController = require('../controllers/activity.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// router.post('/create', ActivityController.create);
router.get('/read', ActivityController.index);
router.get('/count', ActivityController.count);

module.exports = router;