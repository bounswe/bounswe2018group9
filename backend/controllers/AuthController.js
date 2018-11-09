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
            // The expiresIn token valid for 2 weeks 
            const token = jwt.sign(user.toJSON(), secretkey, { expiresIn: '2w' });
            return res.json({token}); // the user json object is removed 
        });
    })(req,res);
}

module.exports = {
    signIn
}