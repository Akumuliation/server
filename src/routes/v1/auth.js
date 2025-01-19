import express from 'express';
import { isNotAuthorized, isAuthorized, generateToken, sendEmail, parseToken } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

// tenancy
router.post('/login', isNotAuthorized, function (req, res, next) { // Маршрут для входу користувача
  const { email, password } = req.body; // Отримання email та пароля з тіла запиту

  Models.User.findOne({ where: { email } }).then((user) => { // Пошук користувача за email
    const isValidUser = Models.User.authenticate(password, user); // Перевірка пароля користувача

    if (isValidUser) {
      Promise.all([
        generateToken(user.id, '1h'), // Генерація access token
        generateToken(user.id, '24h'), // Генерація refresh token
      ]).then(([accessToken, refreshToken]) => {
        res.json({ accessToken, refreshToken }); // Відправка токенів у відповідь
      }).catch((error) => {
        res.status(500).json({ message: 'Unable to generate token' }); // Помилка генерації токенів
      });
    } else {
      res.status(401).json({ message: 'Unable to log in with provided credentials' }); // Невірні облікові дані
    }
  });
});

router.post('/refresh', isAuthorized, function (req, res, next) { // Маршрут для оновлення токена
  Models.User.findOne({ where: { id: 1 } }).then((user) => { // Пошук користувача за id
    if (!user) return res.status(404).json({ message: 'User not found' }); // Користувача не знайдено

    generateToken(user.id, '1h').then((accessToken) => res.json({ accessToken })).catch((error) => {
      res.status(500).json({ message: 'Unable to generate token' }); // Помилка генерації токена
    });
  })
})

router.post('/create', isNotAuthorized, function (req, res, next) { // Маршрут для створення користувача
  const { email, password, first_name, last_name, birthday } = req.body; // Отримання email та пароля з тіла запиту

  Models.User.create({ email, password, first_name, last_name, birthday }).then((user) => { // Створення користувача
    generateToken({ email }, '1h')
    .then((token) => sendEmail({
      to: email,
      subject: 'Welcome to our service',
      text: 'You have successfully registered on our service. Please, approve your email by following the link: http://localhost:8080/api/v1/auth/approve-email?token=' + token,
    }))
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.error('Unable to send email:', error));

    res.json({ message: 'User created successfully' }); // Користувача створено успішно
  }).catch((error) => {
    res.status(500).json({ message: 'Unable to create user', details: error.errors.map((error) => error.message) }); // Помилка створення користувача
  });
});

router.get('/approve-email', isNotAuthorized, function (req, res, next) { // Маршрут для підтвердження користувача
  const { token } = req.params;
  console.log(`token: ${token}`, req.params);
  parseToken(token)
    .then((decodedToken) => Models.User.update({ approved: true }, { where: { email } }))
    .then(() => res.json({ message: 'User approved successfully' }))
    .catch((error) => {
      res.status(500).json({ message: 'Unable to approve user' });
    });
});

export const auth = router;
