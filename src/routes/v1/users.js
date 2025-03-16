import express from 'express';
import { isAprroved, isAuthorized, convertStartEndToLimitOffset} from '../../helpers/index.js';
import Models from '../../models/index.js';

const router = express.Router();

router.get('/', isAuthorized, isAprroved, function(req, res){
      const { approved = true, start = 0, end = 20 } = req.query;
      const { limit, offset } = convertStartEndToLimitOffset(start, end);
      Models.User.findAndCountAll({ limit, offset, approved }).then(({ count, rows: users }) => {
            res.setHeader("x-total-count", count).json(users);
      }).catch(()=> res.status(500).json({ message: 'Fail to find Users' }));
      }
);
// зробити сортування asc/desc, по імені, по email, по даті реєстрації, дні народження
export const users = router;




