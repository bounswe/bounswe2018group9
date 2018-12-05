const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import API routers
const authRouter = require('./auth');
const eventsRouter = require('./events');
const usersRouter = require('./users');
const uploadRouter = require('./upload');
const searchRouter = require('./search');

// Register API routers
router.use('/auth', authRouter);
router.use('/events', passport.authenticate('jwt', {session: false}), eventsRouter);
router.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
router.use('/upload', passport.authenticate('jwt', {session: false}), uploadRouter);
router.use('/api/search', passport.authenticate('jwt', {session: false}), searchRouter);
module.exports = router;
