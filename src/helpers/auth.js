import jwt from 'jsonwebtoken';

export const isAuthorized = (req, res, next) => {
  const [text, token] = req.headers.authorization.split(' ');

  if(text !== 'Bearer') {
    res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    console.log('decodedToken', decodedToken);
    if (err) {
      res.status(403).json({ message: 'Access denied' });
    } else {
      next();
    }
  });
}

export const isNotAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  if(authorization) {
    res.status(403).json({ message: 'Access denied' });
  } else {
    next();
  }
}
