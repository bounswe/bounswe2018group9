const passport = require('passport');
const jwt = require('jsonwebtoken');

const secretkey = 'ajkbsdasdJAKJaOIdfLJtSkmKjkkpkhb';

const User = require('../models/User');

function login(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).send('We couldn\'t find any such user.');
    }

    const token = jwt.sign({ _id: user._id }, secretkey, { expiresIn: '7d' });
    return res.send({ token });
  })(req, res, next);
}

function register(req, res, next) {
  const user = new User(req.body)

  user.save()
    .then((user) => {
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      res.status(400);
      res.send({ err });
    });
}

module.exports = {
  login,
  register
};
