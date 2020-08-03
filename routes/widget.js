var WidgetController = require('../controllers/widget.controller');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', WidgetController.index);

module.exports = router;
