/**
 * @file email.js
 * @author Huy Le (huyisme-005)
 * @module config/email
 * @description Provides email sending utilities for verification and password reset using Nodemailer.
 */
const nodemailer = require('nodemailer');

/**
 * Creates a Nodemailer transporter for sending emails.
 * @returns {import('nodemailer').Transporter}
 */
/**
 * Creates a Nodemailer transporter for sending emails.
 * @returns {import('nodemailer').Transporter}
 * @see https://nodemailer.com/smtp/ for SMTP config details
 * @note If emails are not being sent, check your .env variables and see README.md for debugging tips.
 */
const createTransporter = () => {
  // Use nodemailer.createTransport (not createTransporter)
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Sends a verification email with a code to the specified address.
 * @async
 * @param {string} email - The recipient's email address.
 * @param {string} verificationCode - The verification code to send.
 * @returns {Promise<{success: boolean, messageId: string}>}
 */
const sendVerificationEmail = async (email, verificationCode) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your ReWear Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Welcome to ReWear!</h1>
          <p style="color: #666; margin: 10px 0;">Where style meets sustainability.</p>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
            Thank you for signing up for ReWear! To complete your registration, 
            please enter the verification code below in your app:
          </p>
          
          <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; 
                      border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
            <h3 style="color: #333; margin: 0; font-size: 24px; letter-spacing: 3px;">
              ${verificationCode}
            </h3>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 25px;">
            This code will expire in 10 minutes. If you didn't create a ReWear account, 
            you can safely ignore this email.
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p style="color: #666; margin: 0; font-size: 12px;">
            © 2025 ReWear. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

/**
 * Sends a password reset email with a code to the specified address.
 * @async
 * @param {string} email - The recipient's email address.
 * @param {string} resetCode - The password reset code to send.
 * @returns {Promise<{success: boolean, messageId: string}>}
 */
const sendPasswordResetEmail = async (email, resetCode) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your ReWear Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Password Reset Request</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
            You requested to reset your password. Please enter the code below in your app:
          </p>
          
          <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; 
                      border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
            <h3 style="color: #333; margin: 0; font-size: 24px; letter-spacing: 3px;">
              ${resetCode}
            </h3>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 25px;">
            This code will expire in 10 minutes. If you didn't request a password reset, 
            you can safely ignore this email.
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p style="color: #666; margin: 0; font-size: 12px;">
            © 2025 ReWear. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
}; 