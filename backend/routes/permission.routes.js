const {Router} = require('express');
const router = Router();

const permissionController = require('../controllers/permission.controller');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');


// CREETE PERMISSION
// POST /api/roles/1/permissions
router.route('/:roleId/permissions').post(
    authenticateAccessToken,
   permissionController.addPermission
)
// delete permission 
router.route('/:roleId/permissions').delete(
    authenticateAccessToken,
   permissionController.deletePermission
)

// view permission of a role | user should be logged in 
router.route('/view/permissions').get(
    authenticateAccessToken,
   permissionController.viewPermissionOfLoggedInUser
)





module.exports = router;