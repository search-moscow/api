var CouponController = require('../controllers/coupon.controller');
var AuthController = require('../controllers/auth.controller');
var path = require('path');
var express = require('express');
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/coupons/originals");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

const storageGallery = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/coupons/photos");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg"|| file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const uploadPhotos = multer({
    storage: storageGallery,
    fileFilter: fileFilter
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, upload.single("uploadFile"), CouponController.create);
router.get('/read', CouponController.index);
router.get('/gethome', CouponController.gethome);
router.post('/update', AuthController.access, upload.single("uploadFile"), CouponController.update);
router.post('/delete', AuthController.access, CouponController.delete);

router.post('/photos', AuthController.access, uploadPhotos.array('photos', 12), CouponController.gallery)
router.post('/optional', AuthController.access, CouponController.additionally)
router.get('/read/:id', CouponController.single);

module.exports = router;