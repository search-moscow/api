var EventController = require('../controllers/event.controller');
var AuthController = require('../controllers/auth.controller');
var path = require('path');
var express = require('express');
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/events/originals");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});



const storageGallery = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/events/photos");
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

router.post('/create', upload.single("uploadFile"), EventController.create);
router.get('/read', EventController.index);

router.get('/gethome', AuthController.access, EventController.gethome);
router.post('/update', AuthController.access, upload.single("uploadFile"), EventController.update);
router.post('/delete', AuthController.access, EventController.delete);
router.post('/enable', AuthController.access, EventController.enable);
router.post('/disable', AuthController.access, EventController.disable);


router.post('/photos', AuthController.access, uploadPhotos.array('photos', 12), EventController.gallery)
router.post('/optional', AuthController.access, EventController.additionally)
router.get('/read/:id', EventController.single);

module.exports = router;