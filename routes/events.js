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

router.post('/create', AuthController.access, upload.single("uploadFile"), EventController.create);
router.get('/read', EventController.index);
router.post('/update', AuthController.access, upload.single("uploadFile"), EventController.update);
router.post('/delete', AuthController.access, EventController.delete);

router.get('/read/:id', EventController.single);
router.get('/search', EventController.search);

module.exports = router;