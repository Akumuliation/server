import express from 'express';
import Models from '../../models/index.js';
const router = express.Router();

export const home = router.get('/', function(req, res, next) {
  Models.User.create({
    first_name: 'Vitalii',
    last_name: 'Herasymenko',
    email: 'akumuliation@gmail.com',
    password: 'test1234',
  }).then(() => res.json({ title: 'CREATE USER' }));
});
