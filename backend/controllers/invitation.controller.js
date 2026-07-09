
const { pool } = require("../db");
const ApiError = require("../utils/ApiErrors");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require('crypto');
const helper = require('../helper/helper');
const ApiResponse = require("../utils/ApiResponse");



// Check 1 — Is the requester actually an admin?
// Read the JWT token from the request header
// Decode it → check if role === 'admin'
// If not admin → reject with 403

// Check 2 — Is the email already a registered user?
// Query users table: does this email already exist?
// If yes → reject. No point inviting someone who already has an account.

// Check 3 — Does a PENDING invite already exist for this email?
// Query invitations table: is there already a row with this email and status = 'pending'?
// If yes → reject or return the existing token (your choice, but rejecting is cleaner)
// This prevents admin from accidentally creating 10 links for the same person
const expiresAt = new Date(
    Date.now() + 48 * 60 * 60 * 1000
);
// CREATE INVITATION 
const createInvitation = asyncHandler(async (req, res)=>{
const frontendUrl = process.env.FRONTEND_URL;

    const {email} = req?.body;
    try {
        // is this email already exisit 
        const [isUserAlreadyExistWithThisMail] = await pool.query(
            'select * from users where email = ?', [email]
        )
        if(isUserAlreadyExistWithThisMail.length>=1){
            return res.status(409).json(new ApiError(409, "This email is already Registered:" ,"This email is already Registered:"))
        }



// Logged in usermust have access to "create_user"  || TO GENERATE LINK 
const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

    // if no "crete_user" permission then show error 
const hasCreateUserPermission = userWithPermission.some(
    p => p.permission_name === 'create_user'
);

if(!hasCreateUserPermission) return res.json(new ApiError(403, [],"No Permission To Create User."))


// check if the link is already created and used for this particular email or pending or used
const [isAlreadyCreatedAndUsed] = await pool.query(
    `SELECT email, status, expires_at, token
     FROM invitations
     WHERE email = ?
     AND status IN (?, ?)`,
    [email, 'pending', 'used']
);

// check if link is expired then make its status expired and proceed to create new one 
// there can be multiple links: 
// 1. checks all link have passed 48hrs
// 2. if passed, make all status expired then create a new one with pending status 

// if any link is valid not passed 48hrs then return previous link|  only generate new link if passed 48hrs  
if(isAlreadyCreatedAndUsed.length>=1){
    const validInvites = isAlreadyCreatedAndUsed.filter(invite => {
        return new Date(invite.expires_at) > new Date();
    });
    // console.log(validInvites)
// this return valid link not passed 48hrs 
    if(validInvites.length>=1){
        return res.json(new ApiResponse(403, validInvites, `Still have thsese valid links which can be used ${frontendUrl+'/register/token='+validInvites[0].token}/c=${validInvites[0].email}`))
        // ${frontendUrl}/register?token=${token}
    }
    
}
//  if there is link passed 48hrs make its status expired 
await pool.query(`
    UPDATE invitations
    SET status = 'expired'
    WHERE status = 'pending'
    AND expires_at < NOW()
`);


 const userId = req?.user?.id;


        // console.log(hasCreateUserPermission, "hasCreateUserPermission")
        // console.log(userWithPermission, "userWithPermission")
      

   const token = crypto.randomBytes(32).toString('hex');

{
    // tokenVARCHAR (unique)The random secret in the URL
// emailVARCHARWho this invite is for
// created_byINT (FK → users.id)Which admin created it
// used_byINT (FK → users.id)Which user registered with it (null until used)
// statusENUM('pending','used','expired')Track link state
// expires_atTIMESTAMPOptional: auto-expire after X days
// created_atTIMESTAMPWhen admin created it

}

// save link in table here 
const [createdInvite] = await pool.query(
    'INSERT INTO invitations (token, email, created_by, status, used_by, expires_at) VALUES (?,?,?,?,?,?)', 
    [token, email, userId, "pending", null, expiresAt ])

// console.log(`${frontendUrl}/register?token=${token}`)

        return res.json({registerLink:`${frontendUrl}/register?token=${token}/c=${email}`})
        } catch (error) {
            return res.status(500).json(new ApiError(500, `Erorr In getAllUser:` ,error?.message))
        }

})

// GET ALL INVITATION LIST 
const getAllInvitation = asyncHandler(async (req, res)=>{
    // must have access to "view_invitation"
const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

    // if no "view_Invitation" permission then show error 
const hasViewInvitationLinkPermission = userWithPermission.some(
    p => p.permission_name === 'view_invitation'
);
if(!hasViewInvitationLinkPermission) return res.json(new ApiError(403, [],"No Permission To View Link Invitation."))

 const [rows] = await pool.query(`
    SELECT
        i.id,
        i.email,
        i.status,
        i.expires_at,
        i.created_at,

        creator.id AS created_by_id,
        creator.name AS created_by_name,

        used.id AS used_by_id,
        used.name AS used_by_name

    FROM invitations i

    LEFT JOIN users creator
        ON i.created_by = creator.id

    LEFT JOIN users used
        ON i.used_by = used.id
      ORDER BY i.created_at DESC
`);

return res.json(new ApiResponse(200, rows, "All Invites Links"))


})
module.exports = {
    createInvitation,
    getAllInvitation,
}