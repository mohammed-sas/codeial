const express = require('express');
const router = express.Router();
const postApi = require('../../../controllers/api/v1/post_api');
const passport = require('passport');
router.get('/',postApi.index);
// strategy to authenticate is jwt
// we dont want the session cookies to be generated hence it is set false
router.delete('/:id',passport.authenticate('jwt',{session : false}),postApi.destroy);


module.exports = router;