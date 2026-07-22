const {Router} = require('express');
const router = Router();
const forgotPasswordController = require('../../controllers/resetPassword/resetPass.controller');
const { upload }     = require('../../middlewares/upload');
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');



// generate otp if email is valid 
router.route('/forgot-password').post(
    forgotPasswordController.forgotPassword
);
// verify passsword 
router.route('/verify-otp').post(
    forgotPasswordController.verifyOtp
);
// reset passsword 
router.route('/reset-password').post(
    forgotPasswordController.resetPassword
);


module.exports = router;