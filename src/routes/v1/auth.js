import express from 'express';
import { isNotAuthorized, isAuthorized, generateToken } from '../../helpers/index.js';
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

export const auth = router;
