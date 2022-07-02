const yup = require('yup');
const { USER_GENDER_LIST } = require('./../constants');

module.exports.NEW_USER_VALIDATION_SCHEMA = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2)
    .max(64)
    .matches(
      /^[A-Z][a-z]*$/,
      'First name must contain only letter and starts with capital letter'
    )
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2)
    .max(64)
    .matches(
      /^[A-Z][a-z]*$/,
      'Last name must contain only letter and starts with capital letter'
    )
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  passwordHash: yup
    .string()
    .min(8)
    .max(64)
    .matches(
      /(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d.*).*/,
      'Password must contain at least 1 lower, 1 capital letter, 1 digit'
    )
    .required(),
  birthday: yup.date().max(new Date()),
  gender: yup.string().oneOf(USER_GENDER_LIST),
});
