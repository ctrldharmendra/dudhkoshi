const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require('../db/index')
const bcrypt = require('bcrypt');
const { saveFiles } = require("../middlewares/upload");
const jwt = require('jsonwebtoken');
const ms = require("ms");
const helper = require('../helper/helper');


// TOKEN  

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '15m' }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d' }
  );
};

// TOKEN  END


// REGISTER USER | controller
const registerUser = asyncHandler(async (req, res) => {

    const role_id=2;  //here passing roleId 2 bydefault which is for bidders
    let { name, gender, date_of_birth, password, tokenFromFrontend } = req?.body;  

    if(!date_of_birth) date_of_birth =null;
    const {orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress } = req?.body;

    if (!gender || gender.trim() === "") {
  gender = null;
}



    if(!name || !tokenFromFrontend || !orgName) return res.json(new ApiError(400, "", "Name, Password Org. Name, Owner Name, PAN Required ")) 
    if(panNo.length < 9 || panNo.length > 9) return res.json(new ApiError(400, "", "Invalid Pan Number")) 
    if(password.length < 9 || password.length > 20) return res.json(new ApiError(400, "", "Password Must be between 9 to 20 characters.")) 
      
      
      try {

        // check if token is valid or not, is it expired 
        const [isTokenExistInDB] = await pool.query(
          `SELECT token, email from invitations WHERE token = ? AND status = ?`,
          [tokenFromFrontend, "pending"]
        ) 
        if(isTokenExistInDB.length<=0) return res.json(new ApiError(404, "", "The token is invalid. Request Admin To Create new one"))
        
        //  if there is link passed 48hrs make its status expired 
         const [isTokenExpired] =  await pool.query(`
        UPDATE invitations
        SET status = 'expired'
        WHERE status = 'pending'
        AND expires_at < NOW()
        `);


        // it means ki yadi token euta xa ra tyesko expiry time xain then you error return gardeu 
        if(isTokenExpired?.affectedRows >=1) return res.json(new ApiError(404, "", "Token Expired. Request Admin To Create new one."))
        
// console.log(isTokenExpired)

        const hashedPassword = await bcrypt.hash(password, 10);

        // STEP 1: Run DB query first (no files saved yet)
        const [result] = await pool.query(
            'INSERT INTO users (name, email, gender, date_of_birth, password, role_id, isActive) VALUES (?,?,?,?,?,?,?)',
            [name, isTokenExistInDB?.[0]?.email, gender, date_of_birth, hashedPassword, role_id, 1]
        )
// now insert into organization table 
        const [resultOrgTable] = await pool.query(
          `INSERT INTO organizations (orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, user_id)
           VALUES(?,?,?,?,?,?,?,?,?,?)`,
           [orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, result?.insertId]
        )

        // STEP 2: DB succeeded → now save the file to disk. If no file was uploaded, saved will be an empty object {}
        const saved = await saveFiles(req, 'users');
        

        // STEP 3: Update the DB row with the file path (if a file was uploaded)
        if (saved?.dp) {
            await pool.query(
                'UPDATE users SET dp = ? WHERE id = ?',
                [saved?.dp, result?.insertId]
            )
        }
// console.log(orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress,)
// console.log( name, gender, date_of_birth, password, tokenFromFrontend )



const [updateInvitation] = await pool.query(
  `
    UPDATE invitations
    SET 
      status = 'used',
      used_by = ?
    WHERE status = 'pending'
    AND token = ?
  `,
  [result?.insertId, tokenFromFrontend]
);
        return res.status(201).json(new ApiResponse(201, 
          {
                        userId: result.insertId,
                        userEmail: isTokenExistInDB?.[0]?.email,
            organizationId: resultOrgTable.insertId
          }, 
          
          "Created Successfully!"))

    } catch (error) {
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json(
      new ApiError(
        409,
        "",
        "User already exists."
      )
    );
  }

  return res.status(500).json(
    new ApiError(
      500,
      "",
      error.message
    )
  );
}

})


// LOGIN USER | controller
const loginUser = asyncHandler(async (req, res)=>{
  // console.log(req.body)
    try {
      const {email, password} = req?.body;

   const [rows] = await pool.query(
    'select * from users where email = ? AND isActive = ?', [email, 1]
   )

   if(!rows.length){
    return res.json(new ApiResponse(401, [], "Invalid Credential."))
   }

      const user = rows[0];
      
   const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.json(new ApiResponse(401, [], 'Invalid Credential.'));
    }



    const {password:_, ...userWithoutPassword} = user 
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // ---------------------------------------------
    // this is only for not saving cookie in browser | user should be logged in one device only as soon as they log in other device deletes all their previous old refreshToken, accessToken from db 
    
    const [allSession] = await pool.query(
      `DELETE FROM sessions WHERE user_id = ?`,
      [user?.id]
    )
    // ------------------------------------------------
    // console.log(allSession)

    // set session 
    const [sessionResult] = await pool.query(
        'INSERT INTO sessions (user_id, valid, ip, refresh_token) VALUES (?,?,?,?)',
        [user?.id, true, req.clientIp, refreshToken]
    )

// BEFORE 
    //  res.cookie('refreshToken', refreshToken, {
    //   httpOnly: process.env.NODE_ENV === 'production',
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    //   maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION)
    // });
    //  res.cookie('accessToken', accessToken, {
    //   httpOnly: process.env.NODE_ENV === 'production',
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    //   maxAge: ms(process.env.ACCESS_TOKEN_EXPIRATION)
    // });

    // --- AFTER ---
res.cookie('refreshToken', refreshToken, {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
});

res.cookie('accessToken', accessToken, {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'

});



  return res.json(new ApiResponse(200, {userWithoutPassword, accessToken, refreshToken}, "Success."))
    } catch (error) {
        return res.json(new ApiError(500, "", `LoginController: ${error}`))

    }
})


// REFRESH THE TOKEN WHEN EXPIRED AND SET NEW ONE TO COOKIE | controller
const refreshToken = asyncHandler(async (req, res)=>{
  
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token missing' });
    }


    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);

    // console.log(rows, "row")
    const user = rows[0];

    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }


    // find older session id 
  const [sessions] = await pool.query(
  `SELECT *
   FROM sessions
   WHERE refresh_token = ? AND valid = 1`,
  [token]
);
// if not found old one then show error 
if (!sessions.length) {
  return res.status(401).json({
    success: false,
    message: "Invalid refresh token"
  });
}

const session = sessions[0];

const newRefreshToken = createRefreshToken(user);
const newAccessToken = createAccessToken(user);

// console.log(newAccessToken, "ac")
// console.log(newRefreshToken, "rf")
    
await pool.query(
  `UPDATE sessions
   SET refresh_token = ?
   WHERE id = ?`,
  [newRefreshToken, session.id]
);


// set acc token and ref token in cookies 

     res.cookie('refreshToken', newRefreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      // maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION)
    });
     res.cookie('accessToken', newAccessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      // maxAge: ms(process.env.ACCESS_TOKEN_EXPIRATION)
    });

    return res.json(new ApiResponse(201, {newAccessToken, newRefreshToken}, "Refresh Success."));
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Refresh failed', error: error.message });
  }
})

// LOGOUT | controler 
const logOut = asyncHandler(async (req, res)=>{
try {
       const token = req?.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token missing' });
    }
const userId = req?.user?.id;
// const [sessions] = await pool.query(
//   `SELECT * FROM sessions WHERE refresh_token = ? AND valid = 1`,
//   [token]
// )

  await pool.query(
  `DELETE FROM sessions WHERE refresh_token = ? AND valid = 1`,
  [token]
)

    res.clearCookie('refreshToken', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    });
     res.clearCookie('accessToken', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    });

return res.json(new ApiResponse(201, [], "Logout Success."))

} catch (error) {
    return res.json(new ApiError(500, "", `Logout Controller: ${error}`))

}

})

// LOGOUT FROM ALL DEVICE AT ONCE | controller 
const logOutAll = asyncHandler(async (req, res)=>{
try {
        const userId = req?.user?.id;

    const [row] =  await pool.query(
      `DELETE FROM sessions WHERE user_id = ?`,
      [userId]
     )

         res.clearCookie('refreshToken', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    });
     res.clearCookie('accessToken', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    });

       return res.json(new ApiResponse(500, row, "Log Out Success from all Device." ))


} catch (error) {
  return res.json(new ApiError(500, "", `LogoutAllController: ${error}`))
}
})

// AUTH USER IS AUTHENTICATED OR NOT | CHECK IN FRONTEND PROXY JS
const authMe = asyncHandler(async (req, res)=>{
try{
        return res.status(200).json({
        success: true,
        message: "Authenticated user",
        user: req.user,
    });
}catch(err){
  return res.status(500).json(
  new ApiError(500, "", err.message)
);
}


})


const changePassword = asyncHandler(async (req, res)=>{
  if(!req?.body) return res.json(new ApiError(409, "", "All filed Required"))
  const {newPassword, oldPassword} = req?.body;

         const {id} = req?.user;  //who is logged in 



const [rows] = await pool.query(
  `SELECT * FROM users where id = ?`,
  [id]
)

      const user = rows[0];
 
   const passwordMatches = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatches) {
      return res.json(new ApiResponse(401, [], 'Invalid Credential.'));
    }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


    const [result] = await pool.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id]
    )

    return res.json(new ApiResponse(201, result, "Success."))

})

// CREATE USER | BY ADMIN 
const createUserByAdmin = asyncHandler(async (req, res)=>{
  if(!req?.body) return res.json(new ApiError(409, "", "All filed Required"))
 let { name,email, gender, password, role_id, cPassword }  = req?.body;

  role_id = Number(role_id);

  // console.log( name,email, gender, password, role_id, cPassword )

    if(!name || !email || !gender || !password || !role_id || !cPassword) return res.status(400).json(new ApiError(400, "", "All Fields Required here."))
      if(password.length < 9 || password.length > 20) return res.status(400).json(new ApiError(400, "", "Password Must be between 9 to 20 characters."))
     if(cPassword.length < 9 || cPassword.length > 20) return res.status(400).json(new ApiError(400, "", "Confirm Password Must be between 9 to 20 characters."))

      // bidders roleid is 2 which is not allowed to create from here 
      if(role_id === 2) return res.status(400).json(new ApiError(400, "", "Bidders Cant be created from here ."))

      if (password !== cPassword) {
  return res
    .status(400)
    .json(new ApiError(400, "", "Passwords do not match."));
}
      
      const connection = await pool.getConnection();
      try {
        // check if logged in user has permission to create user 
        // Logged in usermust have access to "create_user"  || TO GENERATE LINK 
const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length === 0) return res.status(403).json(new ApiResponse(403, "No Any Permission!"))

    // if no "crete_user" permission then show error 
const hasCreateUserPermission = userWithPermission.some(
    p => p.permission_name === 'create_user'
);

if(!hasCreateUserPermission) return res.status(403).json(new ApiError(403, [],"No Permission To Create User."))




// check if the user alreday registered with this email 
        const [isUserExists] = await connection.query(
          `SELECT email FROM users WHERE email = ?`,
          [email]
        )
        if(isUserExists.length>=1){
            return res.status(409).json(new ApiError(409, "This email is already Registered:" ,"This email is already Registered:"))
        }

const hashedPassword = await bcrypt.hash(password, 10);


// STEP 1:Now Save the user in DB
          await connection.beginTransaction();
const [result] = await connection.query(
        'INSERT INTO users (name, email, gender, password, role_id, isActive) VALUES (?,?,?,?,?,?)',
        [name, email, gender, hashedPassword, role_id, 1]
)
  
// now insert into organization table 
const [resultOrgTable] = await connection.query(
  `INSERT INTO organizations (orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, user_id)
   VALUES(?,?,?,?,?,?,?,?,?,?)`,
   [null, null, null, null, null, null, null, null, null, result?.insertId]
)
    

  await connection.commit();
return res.status(201).json(new ApiResponse(201, result, "Success."))

  } catch (error) {
      await connection.rollback();
   
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json(
      new ApiError(
        409,
        "",
        "User already exists."
      )
    );
  }

  return res.status(500).json(
    new ApiError(
      500,
      "",
      error.message
    )
  );
} finally {
  connection.release();
}

})

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logOut,
    logOutAll,
    authMe,
    changePassword,
    createUserByAdmin,
}
