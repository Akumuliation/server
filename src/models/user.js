import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        birthday: {
          type: DataTypes.DATE,
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false,
          len: [8,64],
          // validate: {
          //   is: /^[0-9a-f]{64}$/i,
          // },
          set(value) {
            const salt = bcrypt.genSaltSync();
            this.setDataValue('password', bcrypt.hashSync(value, salt));
          },
        },
      },
      {
        sequelize, modelName: 'User', tableName: 'users', timestamps: true,
      },
    );

    User.authenticate = function(password, user) {
      if(!user)  return false;

      return bcrypt.compareSync(password, user.password);
    };

    return User;
  }
}


