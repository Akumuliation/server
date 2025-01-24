import { createTransport } from 'nodemailer';
import { emailConfig } from '../config/index.js';

const transporter = createTransport(emailConfig);

export const sendEmail = ({ to, subject, text, html }) => new Promise((resolve, reject) => {
  transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to, subject, text, html,
  }, function(error, info) { // Перевіряємо наявність помилки
    if (error) { // Якщо виникла помилка
      reject(error); // Відправляємо помилку
    } else { // Якщо помилки немає
      resolve(info); // Якщо лист успішно відправлено
    }
  });
});
