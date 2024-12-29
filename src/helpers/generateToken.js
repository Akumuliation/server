import jwt from 'jsonwebtoken';

export const generateToken = (id, lifetime) => new Promise((resolve, reject) => {
  jwt.sign({
    id,
  }, process.env.JWT_SECRET, { expiresIn: lifetime }, (error, token) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
})