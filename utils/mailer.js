import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // 👈 NECESARIO para que process.env funcione

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: false, // true si usas el puerto 465
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export function sendEmail(to, subject, html) {
  return transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to,
    subject,
    html,
  });
}
