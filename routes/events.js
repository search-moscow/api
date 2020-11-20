var EventController = require('../controllers/event.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// router.post('/create', upload.single("uploadFile"), EventController.create);
router.get('/read', EventController.index);
// router.get('/gethome', AuthController.access, EventController.gethome);
router.get('/read/:id', EventController.single);

module.exports = router;