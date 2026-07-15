/**
 * buildEmailHtml({ paragraph, buttonText, buttonLink, logoUrl })
 *
 * Returns a self-contained HTML string ready to be passed to nodemailer's `html` field.
 * All parameters except `paragraph` are optional.
 *
 * @param {object} options
 * @param {string}  options.paragraph   - Main body text shown in the email
 * @param {string}  [options.buttonText] - Label on the CTA button (omit to hide the button)
 * @param {string}  [options.buttonLink] - URL the button links to
 * @param {string}  [options.logoUrl]    - Absolute URL to your logo image (optional)
 * @param {string}  [options.logoAlt]    - Alt text for the logo  (default: "Logo")
 * @param {string}  [options.preheader]  - Short preview text shown in inbox list
 * @returns {string} HTML email string
 */
export function buildEmailHtml({
  paragraph,
  buttonText,
  buttonLink,
  logoUrl,
  logoAlt = "Logo",
  preheader = "",
}) {
  const year = new Date().getFullYear();

  console.log(logoUrl)
  const logoBlock = logoUrl
    ? `<img src="${logoUrl}" alt="${logoAlt}" width="140" style="display:block;margin:0 auto 0 auto;max-width:140px;" />`
    : `<div style="display:inline-block;background:#4F46E5;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.5px;padding:10px 22px;border-radius:10px;">
         ${logoAlt || "YourBrand"}
       </div>`;

  const ctaBlock =
    buttonText && buttonLink
      ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px auto 0;">
        <tr>
          <td style="border-radius:8px;background:#4F46E5;">
            <a href="${buttonLink}"
               target="_blank"
               style="display:inline-block;padding:14px 36px;font-family:'Helvetica Neue',Arial,sans-serif;
                      font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;
                      border-radius:8px;letter-spacing:0.2px;">
              ${buttonText}
            </a>
          </td>
        </tr>
      </table>`
      : "";

  // Paragraph: support \n line breaks
  const formattedParagraph = paragraph
    .split("\n")
    .filter(Boolean)
    .map(
      (line) =>
        `<p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;
                   font-size:15px;line-height:1.7;color:#374151;">${line}</p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Email</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#F3F4F6;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader (hidden preview text in inbox) -->
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&zwnj;&nbsp;&zwnj;&nbsp;</div>` : ""}

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
         style="background:#F3F4F6;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
               style="max-width:560px;background:#ffffff;border-radius:16px;
                      box-shadow:0 1px 4px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.06);
                      overflow:hidden;">

          <!-- Top accent bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);height:5px;"></td>
          </tr>

          <!-- Logo area -->
          <tr>
            <td align="center" style="padding:36px 40px 28px;">
              ${logoBlock}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#E5E7EB;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 12px;">
              ${formattedParagraph}
              ${ctaBlock}
            </td>
          </tr>

          <!-- Note below button -->
          ${
            buttonLink
              ? `<tr>
            <td style="padding:20px 40px 0;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                        font-size:12px;line-height:1.6;color:#9CA3AF;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${buttonLink}" style="color:#4F46E5;word-break:break-all;">${buttonLink}</a>
              </p>
            </td>
          </tr>`
              : ""
          }

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 36px;">
              <div style="height:1px;background:#E5E7EB;margin-bottom:24px;"></div>
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                        font-size:12px;color:#9CA3AF;text-align:center;line-height:1.6;">
                © ${year} Dudhkoshi Hydropower. All rights reserved.<br/>
                This email was sent to you because you are a registered user or
                have requested access.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
