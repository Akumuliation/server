import jwt from 'jsonwebtoken';
import { parseToken } from './parseToken.js'; // Імпорт функції для розбору токена

export const isAuthorized = (req, res, next) => { // Функція для перевірки авторизації
  const [text, token] = req.headers.authorization.split(' ');

  if(text !== 'Bearer') {
    res.status(403).json({ message: 'Access denied' });
  }

  parseToken(token).then((decodedToken) => {
    console.log('decodedToken', decodedToken);
    next();
  }).catch((error)=>res.status(403).json({ message: 'Access denied' }));
}

export const isNotAuthorized = (req, res, next) => { // Функція для перевірки відсутності авторизації
  const { authorization } = req.headers;

  if(authorization) {
    res.status(403).json({ message: 'Access denied' });
  } else {
    next();
  }
}
