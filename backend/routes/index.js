const express = require('express');
const router = express.Router();

// Import API routers
const authRouter = require('./auth');
const eventsRouter = require('./events');
const usersRouter = require('./users');
const uploadRouter = require('./upload');
const searchRouter = require('./search');
const annotationsRouter = require('./annotations');
const utilsRouter = require('./utils');
const feedRouter = require('./feed');

// Register API routers
router.use('/auth', authRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);
router.use('/upload',  uploadRouter);
router.use('/search',searchRouter);
router.use('/annotations', annotationsRouter);
router.use('/utils', utilsRouter);
router.use('/feed', feedRouter);

module.exports = router;
