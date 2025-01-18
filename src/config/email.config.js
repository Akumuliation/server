// Налаштування конфігурації електронної пошти
// https://mailtrap.io/blog/send-emails-with-nodejs/
export const emailConfig = {
  host: process.env.MAIL_HOST, // Хост SMTP сервера
  port: process.env.MAIL_PORT, // Порт SMTP сервера
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWRD,
  },
};
