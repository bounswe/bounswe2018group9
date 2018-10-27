var mongoose = require("mongoose");
var User = require("../models/User");

var jwt = require("jsonwebtoken");
var secretkey = 'gjkNLnkjBKADJnaldkNADEJMLsmellycat';

exports.addUser = function(req,res,next) {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    console.log('request: '+JSON.stringify(req.body,null,2));

    // Before save salt the password
    
    user.save(function(err,user){
        if(!err){
            res.send(user);
        }
        else
        {
            res.status(500);
            res.send(err);
        }
    });
};

//When user sign in it controls email and password true or not 
exports.signUser = function(req,res,next){
    console.log('body', req.body);
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }

        user.comparePassword(password, function(error,isMatch){
            if(isMatch && isMatch === true){
            jwt.sign({ user: user}, secretkey, (err, token) => {
                res.status(200);
                return res.json({ token: token});
            });
            } else {
                return res.status(401).send();
            }
        });
    })
};

//User signed in and see its dashboard after loggedIn
exports.loggedIn = function(req,res,next){
    if(!req.session.user){
        return res.status(404).send();
    }
    
    return res.status(200).send("Welcome Actopus social platform!");
};

//User log out part with destroying session
exports.logOut = function(req,res,next){
    req.session.destroy();
    return res.status(200).send();
}; 
