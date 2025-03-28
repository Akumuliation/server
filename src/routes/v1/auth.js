import express from 'express';
import fs from 'node:fs/promises';
import path from 'path';
import { isNotAuthorized, isAuthorized, generateToken, sendEmail, parseToken, __dirname } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();
// Маршрут для входу користувача
router.post('/login', isNotAuthorized, function(req, res) {
  const { email, password } = req.body; // Отримання email та пароля з тіла запиту

  Models.User.findOne({ where: { email } }).then((user) => { // Пошук користувача за email
    const isValidUser = Models.User.authenticate(password, user); // Перевірка пароля користувача

    if (isValidUser) {
      Promise.all([
        generateToken(user.id, '1h'), // Генерація access token
        generateToken(user.id, '24h'), // Генерація refresh token
      ]).then(([accessToken, refreshToken]) => {
        res.json({ accessToken, refreshToken }); // Відправка токенів у відповідь
      }).catch(() => {
        res.status(500).json({ message: 'Unable to generate token' }); // Помилка генерації токенів
      });
    } else {
      res.status(401).json({ message: 'Unable to log in with provided credentials' }); // Невірні облікові дані
    }
  });
});
// Маршрут для оновлення токена
router.post('/refresh', isAuthorized, function(req, res) {
  Models.User.findOne({ where: { id: 1 } }).then((user) => { // Пошук користувача за id
    if (!user) return res.status(404).json({ message: 'User not found' }); // Користувача не знайдено

    generateToken(user.id, '1h').then((accessToken) => res.json({ accessToken })).catch(() => {
      res.status(500).json({ message: 'Unable to generate token' }); // Помилка генерації токена
    });
  });
});
// Маршрут для створення користувача
router.post('/create', isNotAuthorized, function(req, res) {
  const { email, password, first_name, last_name, birthday } = req.body; // Отримання email та пароля з тіла запиту

  Models.User.create({ email, password, first_name, last_name, birthday }).then((user) => { // Створення користувача
    generateToken(user.id, '1h')
      .then((token) => fs.readFile(path.join(__dirname, '../views/emails/approve-email.html'), 'utf8')
      .then((html) => html.replace('APPROVE_EMAIL', `http://localhost:8080/api/v1/auth/create/approve-email?token=${token}`)))
      .then((html) => sendEmail({
        to: email,
        subject: 'Welcome to our service',
        html,
      }))
      .then(() => console.log('Email sent successfully'))
      .catch((error) => console.error('Unable to send email:', error));

    res.json({ message: 'User created successfully' }); // Користувача створено успішно
  }).catch((error) => {
    res.status(500).json({ message: 'Unable to create user', details: error.errors.map((error) => error.message) }); // Помилка створення користувача
  });
});
// Маршрут для підтвердження користувача
router.get('/create/approve-email', isNotAuthorized, function(req, res) {
  const { token } = req.query;

  parseToken(token)
  .then((parsedToken) => {
    console.log('Token is valid', parsedToken);
    return parsedToken;
  })
    .then(({ id }) => Models.User.update({ approved: true }, { where: { id } }))
    .then(() => {
      res.json({ message: 'User approved successfully' });
    })
    .catch((error) => {
      console.log('Token is invalid', error);
      res.status(500).json({ message: 'Unable to approve user' });
  });
});
// Маршрут для відновлення пароля
router.post('/forgot-password', isNotAuthorized, function(req, res){
  const {email, redirect} = req.body;

  Models.User.findOne({ where: { email } }).then((user) => {
    generateToken(user.id, '1h')
    .then((token) => fs.readFile(path.join(__dirname, '../views/emails/approve-email.html'), 'utf8')
    .then((html) => html.replace('APPROVE_EMAIL', `${redirect}?token=${token}`)))
    .then((html) => sendEmail({
      to: email,
      subject: 'Do you wont reset password?',
      html,
    })
    ).then(() => {
      res.status(200).json({message: `Please confirm your email ${email}`})
    }).catch((error) => {
      res.status(400).json({message: 'Can not send email'})
    });
  }).catch((error) => {
  res.status(404).json({message: `User with email ${email} not found`})
  });
});
// Маршрут для підтвердження email для відновлення пароля
router.post('/forgot-password/approve-email', isAuthorized, function(req, res){
  const {id} = req.auth;
  generateToken(user.id, '30m')
  .then((token)=>res.json({ token }))
  .catch(()=> res.status(500).json({ message: 'Token generation failed' }))
});
// Маршрут для встановлення нового пароля
router.post('/forgot-password/set-password', isAuthorized, function(req, res){
  const {id} = req.auth;
  const {password} = req.body;

  Models.User.update({ password }, { where: { id } }).then(() => {
    res.status(200).json({message: 'Password successfully updated'})
  }).catch((error) => {res.status(400).json({message: 'Unable to set new password'})
  });
});

export const auth = router;
