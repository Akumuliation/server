import express from 'express';
import { isAprroved, isAuthorized, convertStartEndToLimitOffset} from '../../helpers/index.js';
import Models from '../../models/index.js';
import { User } from '../../models/user.js';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', isAuthorized, isAprroved, function(req, res){
      const { approved = true, start = 0, end = 20 } = req.query;
      const { limit, offset } = convertStartEndToLimitOffset(start, end);
      Models.User.findAndCountAll({ limit, offset, approved }).then(({ count, rows: users }) => {
            res.setHeader("x-total-count", count).json(users);
      }).catch(() => res.status(500).json({ message: 'Fail to find Users' }));
      }
);
router.get('/:name/:filter', isAuthorized, isAprroved, function(req, res){
      const { name, filter } = req.params;
      User.findAll({
            order: [[ name, filter ]]
      }).then(users => {
            res.json(users);
      }).catch(() => res.status(500).json({ message: `Fail to filter ${name} use list of this id, first_name, last_name, email, birthday, approved, password, createdAt, updatedAt` }));
});

router.get('/filter-by/:names/:letter', isAuthorized, isAprroved, async (req, res) => {
      const { names, letter } = req.params;
      User.findAll({
      where: {
            [names]: {
            [Op.like]: `${letter}%`
      }}}).then(users => {
            res.json(users);
      }).catch(() => res.status(500).json({ message: `Failed to filter users` }));
});

//  first_name, last_name, email, birthday, approved
// зробити сортування asc/desc, по імені, по email, по даті реєстрації, дні народження

export const users = router;




