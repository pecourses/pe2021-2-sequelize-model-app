'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        validate: {
          isNot: /^\s*$/,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      underscored: true,
    }
  );
  return Task;
};
