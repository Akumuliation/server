import jwt from 'jsonwebtoken';
// Функція для генерації токена
export const generateToken = (id, lifetime) => new Promise((resolve, reject) => {
  jwt.sign({
    id,
  }, process.env.JWT_SECRET, { expiresIn: lifetime }, (error, token) => { // Використання секретного ключа та часу життя токена
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
});