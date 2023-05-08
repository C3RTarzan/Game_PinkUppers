const router = require('express').Router();

const UserController = require('../controllers/UserController');

//middlware
//const verifyToken = require('../helpers/verify-token')


//routers
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router