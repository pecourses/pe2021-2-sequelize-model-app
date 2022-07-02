const path = require('path');

const CONSTANTS = {
  USER_GENDER_LIST: ['male', 'female', 'other'],
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
};

module.exports = CONSTANTS;
