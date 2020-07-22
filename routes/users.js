var UserController = require('../controllers/users.controller');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
// router.post('/make-admin', UserController.createAdminUser)
router.post('/profile', UserController.profile)
router.post('/check-admin', UserController.checkAdmin)

module.exports = router;
