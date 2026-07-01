


const {Router} = require('express');
const router = Router();

const bidControlller = require('../../controllers/bid/bid.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');





// CREATE BID_FORM 
router.route('/bidform').post(
    authenticateAccessToken,
    bidControlller.createBidForm
);

// GET ALL BID_FORMS 
router.route('/bidform').get(
    authenticateAccessToken,
    bidControlller.getAllBids
);

// GET A SINGLE BID | WITH ALL DETAILS TO SHOW IN FRONTEND 
router.route('/bidform/:id').get(
    authenticateAccessToken, 
    bidControlller.getSingleBidForm
)

// APPLY BID | SUBMIT BID FORM || APPLY
router.post(
  "/bidform/:id/apply",
  authenticateAccessToken,
  upload({ folder: 'bid-applications' }).array('files', 20), // max 20 files
  bidControlller.applyBid
);



module.exports = router;