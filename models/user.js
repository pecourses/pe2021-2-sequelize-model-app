'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { USER_GENDER_LIST } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Task, {
        foreignKey: { name: 'userId', allowNull: false },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]{1,63}$/,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]{1,63}$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
          this.setDataValue('passwordHash', bcrypt.hashSync(value, 10));
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isBefore: new Date().toISOString(),
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [USER_GENDER_LIST],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
