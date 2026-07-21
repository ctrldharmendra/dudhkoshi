const nodemailer = require("nodemailer");
const { buildOtpEmailHtml } = require("./otpEmailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendOtpEmail = async ({ to, otp }) => {
  const info = await transporter.sendMail({
    from: `"Dudhkoshi Hydropower" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Password Reset OTP",
    html: buildOtpEmailHtml({
      otp,
      logoUrl: "https://i.imgur.com/pcrXLsK.png",
    }),
  });

  return info;
};

module.exports = {
  sendOtpEmail,
};