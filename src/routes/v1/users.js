import express from 'express';
import { isAuthorized } from '../../helpers';
import Models from '../../models/index.js';

const router = express.Router();

router.get('/', isAuthorized, function(req, res){
      Models.User.findAll().then((users) => {
            res.json(users); //ліміт
            
      }).catch(()=> res.status(500).json({ message: 'Fail to find Users' })); // помилка
});

export const users = router;