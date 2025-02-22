import express from 'express';
import {isAuthorized } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

router.get('/', isAuthorized, function(req, res){
      Models.User.findAll({ limit: 20 }).then((users) => {
            res.json(users); //ліміт
      }).catch(()=> res.status(500).json({ message: 'Fail to find Users' })); // помилка
});

export const users = router;