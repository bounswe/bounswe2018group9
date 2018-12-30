const express = require('express');
const router = express.Router();
const passport = require('passport');

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
router.use('/upload', uploadRouter);
router.use('/api/search', searchRouter);
router.use('/annotations', annotationsRouter);
module.exports = router;
