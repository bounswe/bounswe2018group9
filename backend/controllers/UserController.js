var mongoose = require("mongoose");
var User = require("../models/User");

exports.addUser = function(req,res,next) {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    // Before save salt the password
    
    user.save(function(err,user){
        console.log('Error var');
        if(!err){
            console.log('Error yok');
            res.send(user);
        }
    });
};
