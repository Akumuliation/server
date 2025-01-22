import jwt from 'jsonwebtoken';
import { parseToken } from './parseToken.js'; // Імпорт функції для розбору токена
// Функція для перевірки авторизації
export const isAuthorized = (req, res, next) => {
  const [text, token] = req.headers.authorization.split(' ');

  if(text !== 'Bearer') {
    res.status(403).json({ message: 'Access denied' });
  }

  parseToken(token).then((decodedToken) => {
    console.log('decodedToken', decodedToken);
    next();
  }).catch((error)=>res.status(403).json({ message: 'Access denied' }));
}
// Функція для перевірки відсутності авторизації
export const isNotAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  if(authorization) {
    res.status(403).json({ message: 'Access denied' });
  } else {
    next();
  }
}
