

const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require("../../db")
const path = require('path')
const fs = require('fs')
const helper = require('../../helper/helper')



// CREATE AWARD FOR A PARTICULAR BID 
const createAward = asyncHandler(async (req, res)=>{

if(!req?.body?.bidId && !req?.body?.winnerUserId) return res.json(new ApiError(400, [],'bidId and winnerUserId is required'))

    try { 
        // PERMISSION       
    const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "create award" permission then show error 
const hasCreateAward = roleWithPermission.some(
    p => p.permission_name === 'create_award'
);
if(!hasCreateAward) return res.json(new ApiError(403, [],"No Permission To Create Award."))
        // PERMISSION       END

    
// ------------

const {bidId, winnerUserId} = req?.body;  //receive from frontend
// CHECK IF USER HAS APPLIED OR NOT TO THIS BED 
const [doesUserAplliedToThisBid] = await pool.query(
    `SELECT *
FROM bid_applications
WHERE bid_id = ?
AND applicant_user_id = ?`,[bidId, winnerUserId])

if (!doesUserAplliedToThisBid.length > 0) {
  return res.status(403).json(
    new ApiError(403, [], "not applied to this bid.")
  );
}

// CHECK IF USER IS ALREADY AWARDED TO THIS BID
const [alreadyAwarded] = await pool.query(
  `SELECT awarded_to
   FROM bid_master
   WHERE id = ?
     AND awarded_to IS NOT NULL`,
  [bidId]
);

if (alreadyAwarded.length > 0) {
  return res.status(403).json(
    new ApiError(403, [], "This bid has already been awarded.")
  );
}

// DO AWARD NOW 
const [row] =  await pool.query(
  `UPDATE bid_master
   SET awarded_to = ?,
       awarded_by = ?,
       awarded_at = NOW(),
       award_status = 'AWARDED'
   WHERE id = ?`,
  [winnerUserId, req?.user?.id, bidId]
);

return res.status(201).json(new ApiResponse(201,{row}, `Award Creation Success`))


        } catch (error) {
            console.log(error, "err in award cont.")
            return res.status(500).json(new ApiError(500, "", `${error?.message} In createAward:`))
    }

})





module.exports = {
createAward,
}