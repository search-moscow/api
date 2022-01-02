var NewsController = require('../controllers/news.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', NewsController.findAll);
router.get('/home', NewsController.findHome);
router.get('/last', NewsController.findLast);
router.get('/one/:id', NewsController.findOne);

module.exports = router;