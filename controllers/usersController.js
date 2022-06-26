const createError = require('http-errors');
const _ = require('lodash');
const { User, Task } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUserInst = await User.create(body);
    const preparedUser = _.omit(createdUserInst.get(), [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;
  console.log('limit', limit);
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['passwordHash', 'createdAt', 'updatedAt'],
      },
      limit,
      offset,
    });

    if (!foundUsers.length) {
      return next(createError(404, 'Users Not Found'));
    }

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: {
        exclude: ['passwordHash', 'createdAt', 'updatedAt'],
      },
    });

    if (!foundUser) {
      return next(createError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    // 1
    const [updatedUserCount, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
      raw: true,
    });
    if (!updatedUser) {
      return next(createError(404, 'User Not Found'));
    }
    const preparedUser = _.omit(updatedUser, [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
    // 2 - не оптимальный по количеству обращений к базе
    // const foundUser = await User.findByPk(userId);

    // if (!foundUser) {
    //   return next(createError(404, 'User Not Found'));
    // }
    // const updatedUser = await foundUser.update(body);
    // const preparedUser = _.omit(updatedUser.get(), [
    //   'passwordHash',
    //   'createdAt',
    //   'updatedAt',
    // ]);
    // res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;
  try {
    const [updatedUserCount, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
      raw: true,
    });
    if (!updatedUser) {
      return next();
    }
    const preparedUser = _.omit(updatedUser, [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletingUserCount = await User.destroy({
      where: { id: userId },
    });

    if (!deletingUserCount) {
      return next(createError(404, 'User Not Found'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  const {
    params: { userId },
    query: { limit = 10, offset = 0 },
  } = req;

  try {
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
      return next(createError(404, 'User Not Found'));
    }

    const foundUserTasks = await foundUser.getTasks({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset,
    });

    res.status(200).send({ data: foundUserTasks });
  } catch (err) {
    next(err);
  }
};
