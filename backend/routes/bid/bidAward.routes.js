


const {Router} = require('express');
const router = Router();

const bidControlller = require('../../controllers/bid/bid.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const awardController = require('../../controllers/bid/bidAward.controller');




// CREATE BID_FORM 
router.route('/award').post(
    authenticateAccessToken,
    awardController.createAward
);

// router.route('/bidform').get(
//     authenticateAccessToken,
//     bidControlller.getAllBids
// );

module.exports = router;