import { createTransport } from "nodemailer";
import { emailConfig } from "../config/index.js";

const transporter = createTransport(emailConfig);

export const sendEmail = ({ to, subject, text, html }) => new Promise((resolve, reject) => {
      transporter.sendMail({
            from: 'youremail@gmail.com',
            to, subject, text, html,
      }, function (error, info) {
            if (error) {
                  reject(error);
            } else {
                  resolve(info);
            }
      });
})