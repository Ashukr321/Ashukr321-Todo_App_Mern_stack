import nodemailer from 'nodemailer';
import configEnv from '../config/configEnv.js';
import { getDefaultAutoSelectFamily } from 'net';
// welcome mail options
const welcomeMailOptions =  (email, userName) => {
  return {
    from: `${configEnv.smtp_email}`,
    to: email,
    subject: 'Welcome to the app',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #333;">Welcome to Our Service, ${userName}!</h2>
        <p style="color: #555;">Your account has been created successfully!</p>
        <p style="color: #555;">Thank you for registering with us. We are excited to have you on board.</p>
        <p style="color: #555;">If you have any questions, feel free to reach out to our support team.</p>
        <p style="color: #555;">Best regards,<br>Your Company Name</p>
        <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
            <p>This email was sent to you because you registered with us.</p>
        </footer>
    </div>
`,
  }
}

const verificationMailOptions = (email,verificationCode)=>{
  return {
    from: `${configEnv.smtp_email}`,
    to: email,
    subject: 'Welcome to the app',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <p style="color: #555;">Your verification code is ${verificationCode}.</p>
        <p style="color: #555;">Thank you for registering with us. We are excited to have you on board.</p>
        <p style="color: #555;">If you have any questions, feel free to reach out to our support team.</p>
        <p style="color: #555;">Best regards,<br>Your Company Name</p>
        <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
            <p>This email was sent to you because you registered with us.</p>
    `
  }
}

export   { welcomeMailOptions,verificationMailOptions }