import express from 'express';
import { app, isAprroved, isAuthorized } from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

router.get('/', isAuthorized, isAprroved, function(req, res){
      const { approved = true, limit = 20, offset = 0 } = req.query;
      Models.User.findAndCountAll({ 
            limit: parseInt (limit, 10),
            offset: parseInt (offset, 10),
            where: { approved }
      }).then(({ count, rows: users }) => {
            res.setHeader("x-total-count", count).json(users); //ліміт
      }).catch(()=> res.status(500).json({ message: 'Fail to find Users' })); // помилка
      }
);
// зробити start і end для users
export const users = router;




/*                setTimeout(() => {
                  const newUsers = users.concat(Array.from({ length: 20 }));
                  users.push(...newUsers);
                  limit++;
                  approved = true;
            }, 1000);
            window.addEventListener('scroll', () => {
                  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                  if (scrollTop + clientHeight >= scrollHeight - 5 && approved) {
                        fetchMoreData();
                  }*/