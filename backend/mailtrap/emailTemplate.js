export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #00838F, #00ACC1); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Verify Your Email</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello <strong>{name}</strong>,</p>
      <p style="font-size: 16px;">Thank you for signing up! Your verification code is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #00838F;">{verificationCode}</span>
      </div>
      <p style="font-size: 16px;">Please enter this code on the verification page to complete your registration. This code will expire in 15 minutes.</p>
      <p style="font-size: 16px;">If you did not create an account, please ignore this email.</p>
      <p style="font-size: 16px;">Best regards,<br /><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; padding: 15px; background-color: #f0f0f0; color: #888; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f2f4f6; color: #333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <div style="background: linear-gradient(to right, #00838F, #00ACC1); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Password Reset Successful</h1>
    </div>

    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello, <strong>{UserName}</strong>,</p>
      <p style="font-size: 16px;">We’re happy to let you know that your password has been successfully updated.</p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #00ACC1; color: #ffffff; width: 70px; height: 70px; line-height: 70px; border-radius: 50%; display: inline-block; font-size: 36px; font-weight: bold;">
          ✓
        </div>
      </div>

      <p style="font-size: 16px;">If you did not perform this action, please <a href="mailto:support@yourapp.com" style="color: #00838F; text-decoration: none; font-weight: bold;">contact support</a> immediately.</p>

      <p style="font-size: 16px;">For your account safety, we recommend:</p>
      <ul style="font-size: 16px; padding-left: 20px; margin-top: 10px;">
        <li>Using a strong, unique password.</li>
        <li>Enabling two-factor authentication (2FA).</li>
        <li>Avoiding reuse of passwords across different sites.</li>
      </ul>

      <p style="font-size: 16px;">Thanks for helping us keep your account secure!</p>

      <p style="font-size: 16px;">Best regards,<br><strong>PeerBridge Team</strong></p>
    </div>

    <div style="background-color: #f2f4f6; text-align: center; padding: 15px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>

  </div>
</body>
</html>
`;

// export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Password Reset Successful</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background: linear-gradient(to right, #00838F, #00838F); padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Hello,{UserName}</p>
//     <p>We're writing to confirm that your password has been successfully reset.</p>
//     <div style="text-align: center; margin: 30px 0;">
//       <div style="background-color: #00838F; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
//         ✓
//       </div>
//     </div>
//     <p>If you did not initiate this password reset, please contact our support team immediately.</p>
//     <p>For security reasons, we recommend that you:</p>
//     <ul>
//       <li>Use a strong, unique password</li>
//       <li>Enable two-factor authentication if available</li>
//       <li>Avoid using the same password across multiple sites</li>
//     </ul>
//     <p>Thank you for helping us keep your account secure.</p>
//     <p>Best regards,<br>Your App Team</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - PeerBridge</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(90deg, #00838F, #006064); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Reset Your Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">Hello <strong>{UserName}</strong>,</p>
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">We received a request to reset your password. If you did not request this, you can safely ignore this email.</p>
              <p style="font-size: 16px; color: #333333; margin: 0 0 30px;">Otherwise, click the button below to reset your password:</p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="{resetURL}" style="background-color: #00838F; padding: 14px 24px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 6px; display: inline-block;">Reset Password</a>
              </div>
              <p style="font-size: 14px; color: #555555; margin: 0 0 20px;">Please note: This link will expire in <strong>1 hour</strong> for your security.</p>
              <p style="font-size: 14px; color: #555555; margin-top: 30px;">Best regards,<br><strong>PeerBridge Team</strong></p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #888888;">
              <p style="margin: 0;">This is an automated message. Please do not reply.</p>
              <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} PeerBridge. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

