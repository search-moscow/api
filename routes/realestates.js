var RealestateController = require('../controllers/realestate.controller');
var AuthController = require('../controllers/auth.controller');
var path = require('path');
var express = require('express');
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/realestates/originals");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

const storageGallery = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/realestates/photos");
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

router.post('/create', AuthController.access, upload.single("uploadFile"), RealestateController.create);
router.get('/read', RealestateController.index);
router.get('/gethome', RealestateController.gethome);
router.post('/update', AuthController.access, upload.single("uploadFile"), RealestateController.update);
router.post('/delete', AuthController.access, RealestateController.delete);

router.post('/photos', AuthController.access, uploadPhotos.array('photos', 12), RealestateController.gallery)
router.post('/optional', AuthController.access, RealestateController.additionally)
router.get('/read/:id', RealestateController.single);

module.exports = router;