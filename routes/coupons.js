var CouponController = require('../controllers/coupon.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// router.post('/create', upload.single("uploadFile"), CouponController.create);
router.get('/read', CouponController.index);
// router.get('/gethome', CouponController.gethome);
router.get('/read/:id', CouponController.single);

module.exports = router;