


const {Router} = require('express');
const router = Router();

const emailController = require('../controllers/email.controller')
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');
// GET email contents | body, subjects
router.route('/').get(
    authenticateAccessToken,
    emailController.getEmailContents
);




module.exports = router;