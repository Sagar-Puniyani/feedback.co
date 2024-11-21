// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from '@/types/ApiResponse';

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     await resend.emails.send({
//       from: 'dev@hiteshchoudhary.com',
//       to: email,
//       subject: 'Mystery Message Verification Code',
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
//     return { success: true, message: 'Verification email sent successfully.' };
//   } catch (emailError) {
//     console.error('Error sending verification email:', emailError);
//     return { success: false, message: 'Failed to send verification email.' };
//   }
// }

import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';


function generateEmailTemplate(username: string, verifycode: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      ">
        <div style="
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 32px;
          margin: 20px 0;
        ">
          <h1 style="
            color: #1a73e8;
            margin-bottom: 24px;
            text-align: center;
            font-size: 24px;
          ">Verify Your Email Address</h1>
          
          <p style="margin-bottom: 16px;">Hi ${username},</p>
          
          <p style="margin-bottom: 24px;">
            Thank you for signing up! Please use the verification code below to complete your registration:
          </p>
          
          <div style="
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 16px;
            text-align: center;
            margin: 24px 0;
          ">
            <span style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 4px;
              color: #1a73e8;
            ">${verifycode}</span>
          </div>
          
          <p style="
            color: #666;
            font-size: 14px;
            margin-top: 24px;
            text-align: center;
          ">
            This verification code will expire in 10 minutes.
            If you didn't request this verification, please ignore this email.
          </p>
        </div>
        
        <div style="
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 24px;
        ">
          <p>This is an automated message, please do not reply.</p>
        </div>
      </body>
    </html>
  `;
}

export async function SendsVerificationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<ApiResponse> {
  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Server-render the email component to static HTML
    const htmlContent = generateEmailTemplate(username, verifycode);

    const mailOptions = {
      from: `"feedback app" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verification Code',
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error: any) {
    console.error('Error in sending verification email:', error.message);
    return { success: false, message: `Failed to send email: ${error.message}` };
  }
}

