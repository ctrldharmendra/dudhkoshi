const {Router} = require('express');
const router = Router();
// const upload = require('../middlewares/multer.middleware');

const invitationController = require('../controllers/invitation.controller');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');
// GET USER
router.route('/').post(
    authenticateAccessToken,
    invitationController.createInvitation
);

router.route('/').get(
    authenticateAccessToken,
    invitationController.getAllInvitation
)





module.exports = router;