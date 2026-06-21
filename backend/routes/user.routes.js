const {Router} = require('express');
const router = Router();
const { upload }     = require('../middlewares/upload');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');
const userController = require('../controllers/user.controller');


// GET USERS
router.route('/users').get(
    authenticateAccessToken,
    userController.getAllUser
);
// GET PARTICULAR USER DETAILS 
router.route('/users/:id').get(
    authenticateAccessToken,
    userController.getUserById
);
// DELETE USER 
router.route('/users/:id').delete(
    authenticateAccessToken,
    userController.deleteUser
)
// UPDATE USER DETAILS 
router.route('/users/profile').put(
    authenticateAccessToken,
    upload({folder: 'users'}).single('dp'),
    userController.updateUserDetails
)
// MY DETAILS 
router.route('/myprofile').get(
    authenticateAccessToken,
    userController.getMe
)
router.route('/role/:id').patch(
    authenticateAccessToken,
    userController.changeUserRole
)




module.exports = router;