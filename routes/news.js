var NewsController = require('../controllers/news.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', NewsController.index);
// router.get('/gethome', NewsController.gethome);
router.get('/read/:id', NewsController.single);

module.exports = router;