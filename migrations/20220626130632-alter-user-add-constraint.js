'use strict';

const { USER_GENDER_LIST } = require('../constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['gender'],
      type: 'check',
      name: 'user_gender_check',
      where: { gender: USER_GENDER_LIST },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'user_gender_check');
  },
};
