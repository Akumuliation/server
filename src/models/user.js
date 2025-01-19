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
          type: DataTypes.STRING(255), // Тип даних - рядок довжиною до 255 символів
          allowNull: false, // Поле не може бути порожнім
          unique: true, // Значення повинно бути унікальним
        },
        birthday: {
          type: DataTypes.DATE,
        },
        approved: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: DataTypes.STRING(64), // Тип даних - рядок довжиною до 64 символів
          allowNull: false, // Поле не може бути порожнім
          len: [8,64], // Довжина пароля повинна бути від 8 до 64 символів
          // validate: {
          //   is: /^[0-9a-f]{64}$/i,
          // },
          set(value) { // Метод для хешування пароля перед збереженням
            const salt = bcrypt.genSaltSync();
            this.setDataValue('password', bcrypt.hashSync(value, salt));// Хешування пароля
          },
        },
      },
      {
        sequelize, modelName: 'User', tableName: 'users', timestamps: true,
      },
    );

    User.authenticate = function(password, user) { // Метод для аутентифікації користувача
      if(!user) return false; // Якщо користувача не знайдено, повернути false

      return bcrypt.compareSync(password, user.password);
    };

    return User;
  }
}



/* 
Код імпортує бібліотеку bcrypt та 
типи даних з sequelize, оголошує клас User, 
що наслідує Model, ініціалізує модель User з 
полями та методами, 
включаючи метод для хешування пароля та 
метод для аутентифікації користувача.
*/


