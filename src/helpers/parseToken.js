import jwt from 'jsonwebtoken';

export const parseToken = (token) => new Promise((resolve, reject) => { // Функція для розбору токена
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => { // Використання секретного ключа для розбору токена
    if (error) {
      reject(error);
    } else {
      resolve(decodedToken);
    }
  });
});
