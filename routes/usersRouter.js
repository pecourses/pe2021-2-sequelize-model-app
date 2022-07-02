const { Router } = require('express');
const { usersController } = require('../controllers');
const { validate, uploads } = require('../middleware');

const usersRouter = Router();

// /api/users/
usersRouter
  .route('/')
  .post(validate.newUserValidation, usersController.createUser)
  .get(usersController.getUsers);

// /api/users/10
usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUser)
  .put(usersController.updateOrCreateUser, usersController.createUser)
  .delete(usersController.deleteUser);

// /api/users/10/tasks
usersRouter.get('/:userId/tasks', usersController.getUserTasks);

// /api/users/1/images
usersRouter.patch(
  '/:userId/images',
  uploads.uploadUserImage.single('userPhoto'),
  usersController.updateUserImage
);

module.exports = usersRouter;
