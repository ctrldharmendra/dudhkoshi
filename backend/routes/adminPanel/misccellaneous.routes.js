






const {Router} = require('express');
const router = Router();
const misc = require('../../controllers/adminPanel/miscellenaous.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// 1. 
// update misc 
router.route('/').put(
    authenticateAccessToken,
  upload({ folder: 'landingPage/misc' }).fields([
    { name: 'logo', maxCount: 1 },
    { name: 'inquiryImage', maxCount: 1 }
  ]),
   misc.updateMiscellaneous
);



// get misc 
router.route('/').get(
    misc.getMiscellaneous
);


module.exports = router;