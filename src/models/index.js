import { db } from '../db.js';
import { User } from './user.js';

function initModels(sequelize) {
  User.initModel(sequelize);
  console.log('INIT MODELS=====');
  // User.hasMany(Post, {
  //   as: 'posts',
  //   foreignKey: 'author_id'
  // })


  return {
    User,
  }
}

export default initModels(db);
