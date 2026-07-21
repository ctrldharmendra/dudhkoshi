const {Router} = require('express');
const router = Router();
const forgotPasswordController = require('../../controllers/resetPassword/resetPass.controller');
const { upload }     = require('../../middlewares/upload');
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');



// register route 
router.route('/forgot-password').post(
    forgotPasswordController.forgorPassword
);
// verify passsword 
router.route('/verify-otp').post(
    forgotPasswordController.verifyOtp
);


module.exports = router;