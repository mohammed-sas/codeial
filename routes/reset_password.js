const express =require ('express');
const router = express.Router();

const resetPassController = require('../controllers/reset_password_controller');

router.get('/',resetPassController.reset);
router.post('/email',resetPassController.findEmail);
router.get('/token/:accessToken',resetPassController.findToken);
router.post('/update',resetPassController.update);
module.exports = router;