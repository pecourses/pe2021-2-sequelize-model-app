const { NEW_USER_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.newUserValidation = async (req, res, next) => {
  const { body } = req;

  try {
    const newUser = await NEW_USER_VALIDATION_SCHEMA.validate(body);
    req.body = newUser;
    next();
  } catch (err) {
    next(err);
  }
};
