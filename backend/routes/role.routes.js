const {Router} = require('express');
const router = Router();

const roleController = require('../controllers/role.controller')
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');


// CREETE ROLE
// POST /api/roles/
router.route('/').post(
    authenticateAccessToken,
   roleController.createRole
)
// GET ALL ROLE 
router.route('/').get(
    authenticateAccessToken,
   roleController.getAllRole
)
// DELETE PARTICULAR ROLE 
router.route('/:roleId/').delete(
    authenticateAccessToken,
   roleController.deleteRole
)
// router.route('/:roleId/permissions').delete(
//     authenticateAccessToken,
//    permissionController.deletePermission
// )





module.exports = router;