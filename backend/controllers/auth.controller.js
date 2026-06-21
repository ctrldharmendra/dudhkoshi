const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require('../db/index')
const bcrypt = require('bcrypt');
const { saveFiles } = require("../middlewares/upload");
const jwt = require('jsonwebtoken');
const ms = require("ms");


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
    const { name, gender, date_of_birth, password, tokenFromFrontend } = req?.body;  
    if(!name || !gender || !date_of_birth || !password || !tokenFromFrontend) return res.json(new ApiError(400, "", "All Fields Required")) 
      
      
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
            'INSERT INTO users (name, email, gender, date_of_birth, password, role_id) VALUES (?,?,?,?,?,?)',
            [name, isTokenExistInDB?.[0]?.email, gender, date_of_birth, hashedPassword, role_id]
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

        return res.status(201).json(new ApiResponse(201, result, "Created Successfully!"))

    } catch (error) {
        res.status(500).json(new ApiError(false, "Failed to create.", error.message))
    }


})


// LOGIN USER | controller
const loginUser = asyncHandler(async (req, res)=>{
  // console.log(req.body)
    try {
      const {email, password} = req?.body;

   const [rows] = await pool.query(
    'select * from users where email = ?', [email]
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
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION)
    });
     res.cookie('accessToken', newAccessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      maxAge: ms(process.env.ACCESS_TOKEN_EXPIRATION)
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
      return res.status(200).json({
        success: true,
        message: "Authenticated user",
        user: req.user,
    });
})


module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logOut,
    logOutAll,
    authMe,
}