const passport = require("passport");
const secretkey = 'ajkbsdasdJAKJaOIdfLJtSkmKjkkpkhb';

const User = require("../models/User");
const jwt = require("jsonwebtoken");

function signIn(req,res,next) {
    passport.authenticate('local', {session: false}, (err,user,info)=>{
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                info: info
            });
        }

        req.login(user, {session:false}, (err) => {
            if (err) {
                res.send(err);
            }

            // Generate the jsonwebtoken
            // The token just give in the payload id of the user 
            // The expiresIn token valid for 1 week
            const token = jwt.sign({ _id: user._id }, secretkey, { expiresIn: '7d' });
            return res.json({token}); // the user json object is removed 
        });
    })(req,res);
}

module.exports = {
    signIn
}