const express = require('express');
const passport = require('passport');

const authRouter = require('./auth');
const eventsRouter = require('./events');
const usersRouter = require('./users');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/events', passport.authenticate('jwt', { session: false }), eventsRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

module.exports = router;
