const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const { upload }     = require('../middlewares/upload');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');

// register route 
router.route('/register').post(
    upload({folder: 'users'}).single('dp'),
    authController.registerUser
);
// login route 
router.route('/login').post(
    authController.loginUser
);
// refresh token route 
router.route('/refresh').post(
    authController.refreshToken
);
// logout route 
router.route('/logout').post(
   authenticateAccessToken, 
    authController.logOut
);
// log out all 
router.route('/logoutall').post(
   authenticateAccessToken, 
    authController.logOutAll
);
// auth me 
router.route('/authme').get(
   authenticateAccessToken, 
    authController.authMe
);




module.exports = router;