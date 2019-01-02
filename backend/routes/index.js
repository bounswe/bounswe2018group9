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
router.use('/events', passport.authenticate('jwt', {session: false}), eventsRouter);
router.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
router.use('/upload', passport.authenticate('jwt', {session: false}), uploadRouter);
router.use('/search', passport.authenticate('jwt', {session: false}), searchRouter);
router.use('/annotations', passport.authenticate('jwt', {session: false}), annotationsRouter);
router.use('/utils', passport.authenticate('jwt', {session: false}), utilsRouter);
router.use('/feed',passport.authenticate('jwt', {session: false}), feedRouter);

module.exports = router;
