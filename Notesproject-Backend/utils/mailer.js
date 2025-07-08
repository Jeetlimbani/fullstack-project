import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email provider
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Notes App Signup',
    html: `
      <p>Your One-Time Password (OTP) for Notes App is: <strong>${otp}</strong></p>
      <p>This OTP is valid for ${config.OTP_EXPIRY_MINUTES} minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};
