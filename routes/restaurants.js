var RestaurantController = require('../controllers/restaurant.controller');
var AuthController = require('../controllers/auth.controller');
var path = require('path');
var express = require('express');
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/restaurants/originals");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

const storageGallery = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/restaurants/photos");
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

router.post('/create', AuthController.access, upload.single("uploadFile"), RestaurantController.create);
router.get('/read', RestaurantController.index);
router.get('/gethome', RestaurantController.gethome);
router.post('/update', AuthController.access, upload.single("uploadFile"), RestaurantController.update);
router.post('/delete', AuthController.access, RestaurantController.delete);

router.post('/photos', AuthController.access, uploadPhotos.array('photos', 12), RestaurantController.gallery)
router.post('/optional', AuthController.access, RestaurantController.additionally)
router.get('/read/:id', RestaurantController.single);

module.exports = router;