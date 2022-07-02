const yup = require('yup');
const { USER_GENDER_LIST } = require('./../constants');

module.exports.NEW_USER_VALIDATION_SCHEMA = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2)
    .max(64)
    .matches(/^[A-Z][a-z]*$/)
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2)
    .max(64)
    .matches(/^[A-Z][a-z]*$/)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  passwordHash: yup
    .string()
    .min(8)
    .max(64)
    .matches(/(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d.*).*/)
    .required(),
  birthday: yup.date().max(new Date()),
  gender: yup.string().oneOf(USER_GENDER_LIST),
});
