const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const secretkey = 'ajkbsdasdJAKJaOIdfLJtSkmKjkkpkhb';

const User = require('../models/User');
const UserController = require('../controllers/UserController');

// Local startegy for logging the user in.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(email,password,cb){
    return UserController.getUser(email,password)
        .then((user)=> {
            if (!user) {
                return cb(null, false, {message: 'Email or password is wrong'});
            }
            return cb(null,user, {message: 'Logged in succesfully'});
        })
        .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : secretkey
    },
    function (jwtPayload, cb) {

        // We can remove this if we want to store user in the payload.
        return User.findOne({id: jwtPayload.id})
            .then(user => {
                console.log(user);
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));