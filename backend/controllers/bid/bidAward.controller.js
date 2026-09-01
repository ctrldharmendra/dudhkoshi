

const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require("../../db")
const path = require('path')
const fs = require('fs')
const helper = require('../../helper/helper')
const { sendDynamicEmail } = require("../../utils/email/sendDynamicEmail")



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

// get winner details to send email winnerDetails?.[0]?.email
const [winnerDetails] =  await pool.query(
  `SELECT * FROM users WHERE id = ?`,
  [winnerUserId]
)
// bid master details 
const [bidMasterDetails] = await pool.query(
  `SELECT title, id FROM bid_master WHERE id = ?`,
  [bidId]
)

// console.log(bidMasterDetails, "bidMasterDetails")

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
 
if (!row.affectedRows) {
  return res.status(500).json(
    new ApiError(500, [], "Failed to award the bid.")
  );
}


// console.log("AFFTER BREAK")
await sendDynamicEmail({
  to: winnerDetails?.[0]?.email,
  subject: `🎉 Congratulations ${winnerDetails?.[0]?.name}! Your Bid Has Been Selected {}`,
  body: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#F3F4F6;padding:40px 10px;font-family:Arial;">

<table width="100%">
<tr>
<td align="center">

<table width="560"
style="
background:white;
border-radius:20px;
overflow:hidden;
">

<tr>
<td style="
background:linear-gradient(135deg,#16A34A,#22C55E);
height:8px;">
</td>
</tr>


<tr>
<td align="center" style="padding:30px;">

<img 
src="https://i.imgur.com/pcrXLsK.png"
width="140"
/>

</td>
</tr>


<tr>
<td style="padding:40px;text-align:center;">

<div style="font-size:50px;">
🎉 🎊 🏆 🎊 🎉
</div>


<h1 style="
color:#16A34A;
font-size:30px;
">
Congratulations ${winnerDetails?.[0]?.name}!
</h1>


<p style="
font-size:16px;
color:#374151;
line-height:1.7;
">
The bid you applied " ${bidMasterDetails?.[0]?.title} " has been selected as the 
<strong>winning bid</strong>.
</p>


<div style="
background:#F0FDF4;
border:1px solid #86EFAC;
border-radius:12px;
padding:20px;
margin:25px 0;
">

<h3 style="color:#166534;">
Bid Status: WON
</h3>



</div>




</td>
</tr>


<tr>
<td style="
background:#F9FAFB;
padding:25px;
text-align:center;
font-size:12px;
color:#9CA3AF;
">

© ${new Date().getFullYear()} Dudhkoshi Hydropower

</td>
</tr>


</table>

</td>
</tr>
</table>

</body>
</html>
`,
});

return res.status(201).json(new ApiResponse(201,{row}, `Award Creation Success`))


        } catch (error) {
            console.log(error, "err in award cont.")
            return res.status(500).json(new ApiError(500, "", `${error?.message} In createAward:`))
    }

})





module.exports = {
createAward,
}