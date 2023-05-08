const router = require('express').Router();

const ServerController = require('../controllers/ServerController');

//middlware
const verifyToken = require('../helpers/verify-token')


//routers
router.get('/', verifyToken, ServerController.root)

module.exports = router