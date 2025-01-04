import jwt from 'jsonwebtoken';

export const generateToken = (id, lifetime) => new Promise((resolve, reject) => { // Функція для генерації токена
  jwt.sign({
    id,
  }, process.env.JWT_SECRET, { expiresIn: lifetime }, (error, token) => { // Використання секретного ключа та часу життя токена
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
})