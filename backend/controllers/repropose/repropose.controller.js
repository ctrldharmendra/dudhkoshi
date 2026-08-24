

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ms = require("ms");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require('../../utils/ApiResponse');
const { pool } = require('../../db');
const { saveFiles } = require('../../middlewares/upload');
// const { sendOtpEmail } = require('../../utils/email/sendOtpEmail');
const { sendAttachmentEmail } = require("../../utils/email/sendAttachmentEmail")
const path = require('path')



const cretePropose = asyncHandler(async (req, res)=>{
if(!req.body) return res.status(409).json(new ApiResponse(409, [], "All filed Required."));

const {userId, bidId} = req.params;

let {title} = req.body;

// check if above all field provided 
[userId, bidId]?.forEach((field)=>{
    if(!field) return res.status(409).json(new ApiResponse(409, [], "All filed Required."));
})

// GET USER BUSINESS EMAIL FROM "organization" table 
const [contactPersonsEmail] = await pool.query(
    `SELECT contactPersonsEmail FROM organizations WHERE user_id = ?`, [userId]
)

// if not file show error 
if(!req?.file || req?.file == undefined) return res.status(409).json(new ApiResponse(409, [], "Document required"));


  try{
    const loggedInUserId = req.user.id;
    // check if particular bid exist or not 
    const [bidExist] = await pool.query(
        `SELECT id, closeDate, title FROM bid_master WHERE id = ?`,
        [bidId]
    )
    if(!bidExist.length) return res.status(404).json(new ApiResponse(404, [], "Bid Doesn't Exist."))
        // check if this bid is closed or not if closed from now then proceed if not closed then show error 
        if(bidExist[0].closeDate > new Date()) return res.status(409).json(new ApiResponse(404, [], "Bid is not closed Yet. Cant Propose."))
        // console.log(userId, title, createdBy, bidId)

    // now save in db 
    const [result] = await pool.query(
        `INSERT INTO reinvitation_attachment (userId, title, createdBy, bidId) VALUES (?, ?, ?, ?)`,
        [userId, title, loggedInUserId, bidId]
    )
        // check above data saved in db 
        if(!result?.insertId) return res.status(500).json(new ApiError(500, [], "Failed to save."))

    // // ?after above query completion | SAVE update document field in reinvitation_attachment table
       const saved = await saveFiles(req, 're-propose');
        
    //    console.log(saved)
    //      STEP 3: Update the DB row with the file path (if a file was uploaded)
        if (saved?.file) {
            await pool.query(
                'UPDATE reinvitation_attachment SET file = ? WHERE id = ?',
                [saved?.file, result?.insertId]
            )
        }

         

        // after above things saved send email to this user's business email | send the file what here provided
await sendAttachmentEmail({
  to: contactPersonsEmail?.[0]?.contactPersonsEmail,
  subject: "Request for Re-Propose",
  body: 
    `
    <!DOCTYPE html>
<html>
<body style="margin:0;background:#F3F4F6;padding:40px 10px;font-family:Arial;">
<table width="100%">
<tr>
<td align="center">
<table width="560" style=" background:white; border-radius:20px; overflow:hidden; ">
<tr><td style=" background:linear-gradient(135deg,#16A34A,#22C55E); height:8px;">
</td>
</tr>
<tr>
<td align="center" style="padding:30px;">
    <img src="https://i.imgur.com/pcrXLsK.png" width="140"/>
</td>
</tr>
<tr>
<td style="padding:40px;text-align:center;">
<div style="font-size:50px;"> Re-Propose Notice!</div>

<h1 style="color:#16A34A; font-size:30px; ">Hey {} the bid you have applied on Need to be Re-Proposed. Please check the document and Re-Propose.</h1>
<p style=" font-size:16px; color:#374151; line-height:1.7; ">The bid is: ${bidExist?.[0]?.title} "</p>
<div style=" background:#F0FDF4; border:1px solid #86EFAC; border-radius:12px; padding:20px; margin:25px 0;">
<a href=${process.env.FRONTEND_URL} style="color:#166534;">Login here to View</a></div></td></tr><tr>
<td style=" background:#F9FAFB; padding:25px; text-align:center; font-size:12px; color:#9CA3AF;
">
© ${new Date().getFullYear()} Dudhkoshi Hydropower
</td></tr></table></td></tr></table>
</body></html>
    `
  ,
  attachments: [
    {
      filename: path.basename(saved.file),
      path: path.join(__dirname, "../../uploads", saved.file),
    },
  ],
});
        
return res.status(201).json(new ApiResponse(201, result, "Success."))

  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Proposal could not be made.', error: error.message });
  }
})

// get all propose for particular bid of particular user 
const getAllPropse = asyncHandler(async (req, res)=>{

    const {bidId, userId} = req.params;

    try {
        
        const [result] = await pool.query(
          `SELECT * FROM reinvitation_attachment WHERE bidId =? AND userId = ?`,
          [bidId, userId]  
        )

return res.status(200).json(new ApiResponse(200, result, "Success."))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(500, [], "Internal Server Error."));
    }
    

})


// GET ALL REUOTED DATA WITH ITS ANS FOR A PARTICULAR BID, FOR A  LOGGED IN USER 
const getAllRequotedLoggedInUser = asyncHandler(async (req, res)=>{

    const {bidId} = req.params;

    try {
        // const [result] = await pool.query(
        //    `SELECT reQ.id as requoted_ques_id
        
        //      FROM reinvitation_attachment 
        //      LEFT JOIN 
        //    ` 
        // )



    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(500, [], "Internal Server Error.", error));
    }


})

// REPLY TO PARTICULAR REQUOTED QUESTION FOR PARTICULAR BID
const replyRequoted = asyncHandler(async (req, res)=>{
    console.log("first")

    const {bidId, requotedQuesId} = req.params;
    try {
// if(!req?.file || req?.file == undefined) return res.status(409).json(new ApiResponse(409, [], "Document required"));

//         // check this bid exist 
//         const [bidExist] = await pool.query(
//             `SELECT id, closeDate, title FROM bid_master WHERE id = ?`,
//             [bidId]
//         )
//         if(!bidExist.length) return res.status(404).json(new ApiResponse(404, [], "Bid Doesn't Exist."))
//             // check if this bid is closed or not if closed from now then proceed if not closed then show error 
//             // if(bidExist[0].closeDate > new Date()) return res.status(409).json(new ApiResponse(404, [], "Bid is not closed Yet. Cant Propose."))
//             // // console.log(userId, title, createdBy, bidId)

//             // check if reuoted question exist or not if not then show error 
//             const [requotedQuesExist] = await pool.query(
//                 `SELECT id FROM reinvitation_attachment WHERE id = ?`,
//                 [requotedQuesId]
//             )
//             if(!requotedQuesExist.length) return res.status(404).json(new ApiResponse(404, [], "Requoted Question Doesn't Exist."))
//                 const [result] = await pool.query(
//                   `INSERT INTO reinvitation_attachment_ans (whoseAnsIsThis, whichQuesAnsIsThis) VALUES (?, ?, ?)`, 
//                   [req?.user?.id, requotedQuesId]
//                 )

//                 if(!result?.insertId) return res.status(500).json(new ApiResponse(500, [], "Failed to save."))
//                 // now save the its file 
//                  const saved = await saveFiles(req, 're-propose');
//         if (saved?.file) {
//             await pool.query(
//                 'UPDATE reinvitation_attachment_ans SET file = ? WHERE id = ?',
//                 [saved?.file, result?.insertId]
//             )
//         }

//         return res.status(201).json(new ApiResponse(201, result, "Success."))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, [], "Internal Server Error.", error));
    }

})

module.exports = {
    cretePropose,
    getAllPropse,
    replyRequoted
}