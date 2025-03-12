import { parseToken } from './parseToken.js'; // Імпорт функції для розбору токена
import Models from '../models/index.js';
// Функція для перевірки авторизації
export const isAuthorized = (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [text, token] = authorization.split(' ');   /* деструктуризація масиву */

  if(text !== 'Bearer') {
    res.status(403).json({ message: 'Access denied' });
  }

  parseToken(token).then((decodedToken) => {
    req.auth = decodedToken
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

export const isAprroved = (req, res, next) => {
  const { id } = req.auth;
  Models.User.findOne({ where: { id } }).then((user) => {
    const { approved } = user;
  if(!approved) {
    res.status(403).json({ message: 'Access denied' });
  } else {
    next();
  }
  })
}