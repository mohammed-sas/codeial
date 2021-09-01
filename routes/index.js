const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
// for any further routers
// router.use('/routerName',require('./routerfile'))
router.use('/post',require('./post'));
console.log('route loaded');
module.exports = router;