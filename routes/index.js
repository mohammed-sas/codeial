const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');
router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any further routers
// router.use('/routerName',require('./routerfile'))
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));

router.use('/api',require('./api'));

console.log('route loaded');
module.exports = router; 