

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ms = require("ms");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require('../../utils/ApiResponse');
const { pool } = require('../../db');
const { sendOtpEmail } = require('../../utils/email/sendOtpEmail');



// POST /forgot-password → generate OTP, hash it, save it, email it.
// POST /verify-reset-otp → verify OTP and mark it as used (or issue a short-lived reset token).
// POST /reset-password → update the password and delete or invalidate the reset record.


// FORGOT PASSWORD GENERATE OTP 
const forgotPassword = asyncHandler(async (req, res)=>{
// 1. Find user
// 2. Generate OTP
// 3. Hash OTP
// 4. Save hash + expiry
// 5. Send email
// 6. Return response
  if(!req?.body) return res.json(new ApiResponse(409, [], "All filed Required.")       )

// otp_expiresAt
  try {
    const [row] = await pool.query(
        `SELECT email FROM users WHERE email = ?`,
        [req.body.email]
    )
    // if user not found
    if(!row.length) return res.json(new ApiResponse(200, [], "If an account exists, an OTP has been sent."))

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    // set otp and expireat 5 minutes ahead 
    const otpExpiresAt = new Date(Date.now() + ms('10m'));
   const [result] = await pool.query(
      `UPDATE users
       SET otp = ?
       , otp_expiresAt = ?
       WHERE email = ?`,
      [hashedOtp, otpExpiresAt, req?.body?.email]
    );

    if(result.affectedRows === 0) return res.json(new ApiResponse(200, [], "If an account exists, an OTP has been sent.."))
        
        // Now if user found and otp saved in db then send email 
const info = await sendOtpEmail({
    to: req.body.email,
    otp,
});


if (info?.accepted?.length > 0) {
  console.log("OTP email sent successfully");
    return res.json(new ApiResponse(201, {}, "Otp Created."));
} else {
    return res.status(401).json({ success: false, message: 'Email couldNot be sent', error: error.message });

  console.log("❌ Email failed");
}

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Email couldNot be sent!', error: error.message });
  }
})

// VERIFY OTP 
const verifyOtp = asyncHandler(async (req, res)=>{
const { email, otp } = req.body;

const [rows] = await pool.query(
  `SELECT * FROM users WHERE email = ?`,
  [email]
);

if(!rows.length) return res.json(new ApiResponse(404, [], "User Not Found."))

    // check expirey 
    const user = rows[0];

if (new Date() > new Date(user.otp_expiresAt)) {
    return res.json(
        new ApiResponse(400, [], "OTP expired.")
    );
}

// match otp 
const isMatch = await bcrypt.compare(
    otp.toString(),
    user.otp
);
if (!isMatch) {
    return res.json(
        new ApiResponse(400, [], "Invalid OTP.")
    );
}

// generate a reset token 
const resetToken = jwt.sign(
  {
    id: user.id,
    email: user.email,
    version: user.password_reset_version,
    purpose: "password-reset",
  },
  process.env.RESET_PASSWORD_SECRET,
  {
    expiresIn: "10m",
  }
);
// after otp verified set otp to null 
await pool.query(
  `UPDATE users
   SET otp = NULL,
       otp_expiresAt = NULL
   WHERE id = ?`,
  [user.id]
)
return res.json(new ApiResponse(200, { resetToken }, "OTP Verified."));

})


// RESET PASSWORD 
const resetPassword = asyncHandler(async (req, res)=>{
        const { resetToken, password, confirmPassword } = req.body;



    if (!resetToken || !password || !confirmPassword ) {
        return res.json(new ApiResponse(400, [], "All fields are required."));
    }
if(password.length < 8) return res.json(new ApiResponse(400, [], "Password must be at least 8 characters."))
    if (password !== confirmPassword) {
        return res.json(new ApiResponse(400, [], "Passwords do not match."));
    }

    
    try {
                // check if reset token is valid
                  const decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET);

                  const [rows] = await pool.query(
    `SELECT password_reset_version
     FROM users
     WHERE id = ?`,
    [decoded.id]
);

if (!rows.length) {return res.json(new ApiResponse(400, [], "Invalid reset token."));}
const user = rows[0];



        // check if reset token puropse is "reset-password "
        if (decoded.purpose !== "password-reset") {
    return res.json(
        new ApiResponse(400, [], "Invalid reset token.")
        );
        }
        // check if version is not equal to user.password_reset_version
        if (decoded.version !== user.password_reset_version) {
    return res.json(
        new ApiResponse(400, [], "Token expired.")
    );
}
  

        // hash the password before storeing in database 
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE users
             SET password = ?,
             password_reset_version=password_reset_version+1
             WHERE id = ?`,
            [hashedPassword, decoded.id]
        );

        return res.json(new ApiResponse(200, {}, "Password reset successfully."));
    } catch (error) {
        
        return res.json(new ApiResponse(400, [], "Invalid reset token."));
    }
})

module.exports = {
    forgotPassword,
    verifyOtp,
    resetPassword,
}