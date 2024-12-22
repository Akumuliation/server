import express from 'express';
import jwt from 'jsonwebtoken'
import { isNotAuthorized } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();
// tenancy
router.post('/login', isNotAuthorized, function(req, res, next) {
  const { email, password } = req.body;

  Models.User.findOne({ where: { email } }).then((user) => {
    const isValidUser = Models.User.authenticate(password, user);

    if (isValidUser) {
      jwt.sign({
        id: user.id,
      }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
        if (err) {
          res.status(500).json({ message: 'Unable to generate token' });
        } else {
          res.json({ token });
        }
      });
    } else {
      res.status(401).json({ message: 'Unable to log in with provided credentials' });
    }
  });
});

export const auth = router;
