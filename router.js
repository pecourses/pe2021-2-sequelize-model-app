const { Router } = require('express');
const tasksRouter = require('./routes/tasksRouters');
const usersRouter = require('./routes/usersRouter');

const router = Router();

router.use('/users', usersRouter);

// реализовать таск роутер (только просмотр всех тасок)
router.use('/tasks', tasksRouter);

module.exports = router;
