const createError = require('http-errors');
const { ValidationError } = require('yup');
const {
  Sequelize: { BaseError, ValidationError: ModelValidationError },
} = require('./../models');

// прописать yupValidationErrorHandler
module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(422).send({
      errors: [
        {
          status: 422,
          title: err.errors[0],
        },
      ],
    });
  }
  next(err);
};

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ModelValidationError) {
    const errors = err.errors.map(e => ({ status: 422, title: e.message }));

    return res.status(422).send({ errors });
  }
  if (err instanceof BaseError) {
    next(createError(500, 'Database Error'));
  }

  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const errorStatus = err?.status ?? 500;
  res.status(errorStatus).send({
    errors: [
      {
        status: errorStatus,
        title: err?.message ?? 'Internal Server Error',
      },
    ],
  });
};
