const {Router} = require('express');
const router = Router();
const reproposeController = require('../../controllers/repropose/repropose.controller');
const { upload }     = require('../../middlewares/upload');
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');



// ! CREATE REPROPOSE 
router.route('/repropose/:bidId/:userId').post(
    authenticateAccessToken,
    upload({folder: 're-propose'}).single('file'),
    reproposeController.cretePropose
);
// ! GET REPROPOSE 
router.route('/repropose/:bidId/:userId').get(
    authenticateAccessToken,
    reproposeController.getAllPropse
);


module.exports = router;