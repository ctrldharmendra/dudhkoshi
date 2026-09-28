






const {Router} = require('express');
const router = Router();
const faqs = require('../../controllers/adminPanel/faqs.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');



// create faqs 
router.route('/').post(
    authenticateAccessToken,
    faqs.createFaqs
);
// update faqs by id
router.route('/:id').put(
    authenticateAccessToken,
    faqs.updateFaqs
);
// get all faqs
router.route('/').get(
    faqs.getFaqs
);
// get faqs by id
router.route('/:id').get(
    faqs.getFaqsById
);
// delete faqs by id
router.route('/:id').delete(
    authenticateAccessToken,
    faqs.deleteFaqs
);
module.exports = router;