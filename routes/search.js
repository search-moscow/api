var SearchController = require('../controllers/search.controller');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', SearchController.index);

module.exports = router;
