var CouponController = require('../controllers/coupon.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// router.post('/create', upload.single("uploadFile"), CouponController.create);
router.get('/all', CouponController.findAll);
router.get('/home', CouponController.findHome);
router.get('/last', CouponController.findLast);
router.get('/one/:id', CouponController.findOne);

module.exports = router;