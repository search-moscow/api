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

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', AuthController.access, upload.single("uploadFile"), RestaurantController.create);
router.get('/read', RestaurantController.index);
router.post('/update', AuthController.access, upload.single("uploadFile"), RestaurantController.update);
router.post('/delete', AuthController.access, RestaurantController.delete);

router.get('/read/:id', RestaurantController.single);
router.get('/search', RestaurantController.search);

module.exports = router;