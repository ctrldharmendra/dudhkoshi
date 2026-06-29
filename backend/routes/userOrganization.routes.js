const {Router} = require('express');
const router = Router();
const { upload }     = require('../middlewares/upload');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');
const userOrganizationController = require("../controllers/userOrganization.controller")


// UPDATE USER ORGANIZATION 
router.route('/organizations').put(
    authenticateAccessToken,
    userOrganizationController.updateUserOrganization
)
// GET USER ORGANIZATION 
router.route('/organizations').get(
    authenticateAccessToken,
    userOrganizationController.getUserOrganization
)





module.exports = router;