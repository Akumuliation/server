import jwt from 'jsonwebtoken';
// Функція для розбору токена
export const parseToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => { // Використання секретного ключа для розбору токена
    if (error) {
      reject(error);
    } else {
      resolve(decodedToken);
    }
  });
});
