import express from 'express';
import { isNotAuthorized, isAuthorized, generateToken } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

// tenancy
router.post('/login', isNotAuthorized, function (req, res, next) {
  const { email, password } = req.body;

  Models.User.findOne({ where: { email } }).then((user) => {
    const isValidUser = Models.User.authenticate(password, user);

    if (isValidUser) {
      Promise.all([
        generateToken(user.id, '1h'),
        generateToken(user.id, '24h'),
      ]).then(([accessToken, refreshToken]) => {
        res.json({ accessToken, refreshToken });
      }).catch((error) => {
        res.status(500).json({ message: 'Unable to generate token' });
      });
    } else {
      res.status(401).json({ message: 'Unable to log in with provided credentials' });
    }
  });
});

router.post('/refresh', isAuthorized, function (req, res, next) {
  Models.User.findOne({ where: { id: 1 } }).then((user) => {
    if (!user) return res.status(404).json({ message: 'User not found' });

    generateToken(user.id, '1h').then((accessToken) => res.json({ accessToken })).catch((error) => {
      res.status(500).json({ message: 'Unable to generate token' });
    });
  })
})

export const auth = router;
