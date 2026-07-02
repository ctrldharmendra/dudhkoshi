


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
// EDIT BID FORM 
router.route('/bidform/:id').put(
    authenticateAccessToken,
    bidControlller.editBidForm
);

// GET ALL BID_FORMS 
router.route('/bidform').get(
    authenticateAccessToken,
    bidControlller.getAllBids
);

// GET A SINGLE BID FORM | WITH ALL DETAILS TO SHOW IN FRONTEND 
router.route('/bidform/:id').get(
    authenticateAccessToken, 
    bidControlller.getSingleBidForm
)

// APPLY BID | SUBMIT BID FORM (VALUE BY BIDDERS) |
router.post(
  "/bidform/:id/apply",
  authenticateAccessToken,
  upload({ folder: 'bid-applications' }).array('files', 20), // max 20 files
  bidControlller.applyBid
);

// EDIT APPLIED BID | THE ONE WHO APPLIED WILL EDIT
router.put(
  "/bidform/:id/apply",
  authenticateAccessToken,
  upload({ folder: 'bid-applications' }).array('files', 20), // max 20 files
  bidControlller.editAppliedBid
);


// GET ALL APPLICANTS OF A PARTICULAR BID FORM || WHO HAS APPLIED TO A PARTICULAR BID FORM
router.get(
  "/:id/applicants",
  authenticateAccessToken,
  bidControlller.getBidApplicants
);

// GET ALL DOCUMENT OF A PARTICULAR BID FORM OF PARTICULAR USER || WHO HAS APPLIED TO A PARTICULAR BID FORM
router.get(
  "/:bidId/application/:applicationId/documents",
  authenticateAccessToken,
  bidControlller.getBidApplicantDocument
);

module.exports = router;