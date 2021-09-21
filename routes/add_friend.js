const express = require('express');
const router = express.Router();
const addFriendController = require('../controllers/add_friend_controller');
router.get('/',addFriendController.add);
router.get('/delete',addFriendController.remove);
module.exports = router;