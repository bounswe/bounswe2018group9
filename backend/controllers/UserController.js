var mongoose = require("mongoose");
var User = require("../models/User");

var jwt = require("jsonwebtoken");
var secretkey = 'gjkNLnkjBKADJnaldkNADEJMLsmellycat';

function getAllUsers(req,res,next) {
    
    User.find({}, (err,users)=>{
        if (err) {
            res.status(500);
            res.send({err});
        } else {
            res.send(users);
        }
    })
}

function getUser(email,password) {
    return new Promise((resolve,reject) => {
        
        User.findOne({email:email}, function(err,user){
            if(err){
                return reject(err);
            }
            if(!user){
                return reject(err);
            }
    
            user.comparePassword(password, function(error,isMatch){
                if(isMatch && isMatch === true){
                    return resolve(user);
                } else {
                    return reject(error);
                }
            });
        })
    });
}

function getUserById(req,res,next) {
    const id = req.params.id;

    User.findById(id, (err,user) => {
        if(err || !user) {
            res.status(500);
            res.send("Cannot find user with id : "+id);
        } else {
            res.status(200);
            res.send(user);
        }
    });
}

function addUser(req,res,next) {
    var user = new User({
        email: req.body.email,
        name: req.body.name,
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
    });
};

//User signed in and see its dashboard after loggedIn
function loggedIn(req,res,next){
    if(!req.session.user){
        return res.status(404).send();
    }
    
    return res.status(200).send("Welcome Actopus social platform!");
};

//User log out part with destroying session
function logOut(req,res,next){
    req.session.destroy();
    return res.status(200).send();
}; 

module.exports = {
    getAllUsers,
    loggedIn,
    addUser,
    getUser,
    logOut,
    getUserById
}