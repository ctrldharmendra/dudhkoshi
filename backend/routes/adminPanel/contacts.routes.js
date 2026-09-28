






const {Router} = require('express');
const router = Router();
const contacts = require('../../controllers/adminPanel/contacts.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// create team
router.route('/').post(
   contacts.createContacts
);

// get all team
router.route('/').get(
   contacts.getContacts
);

// delete contacts
router.route('/:id').delete(
    authenticateAccessToken,
    contacts.deleteContacts
);
   
module.exports = router;