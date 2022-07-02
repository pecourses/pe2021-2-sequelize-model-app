const createError = require('http-errors');
const {
  Sequelize: { BaseError, ValidationError },
} = require('./../models');

// прописать yupValidationErrorHandler

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
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
  console.log('err', err);
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
