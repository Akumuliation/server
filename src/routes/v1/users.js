import express from 'express';
import { isAprroved, isAuthorized } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

router.get('/', isAuthorized, isAprroved, function(req, res){
      const { approved = true, limit = 20, offset = 0 } = req.query;
      Models.User.findAndCountAll({ limit, approved, offset }).then(({ count, rows: users }) => {
            res.setHeader("x-total-count", count).json(users); //ліміт
      }).catch(()=> res.status(500).json({ message: 'Fail to find Users' })); // помилка
});
// зробити start і end для users
export const users = router;