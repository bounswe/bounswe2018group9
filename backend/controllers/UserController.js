var mongoose = require("mongoose");
var User = require("../models/User");

exports.addUser = function(req,res,next) {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    console.log(JSON.stringify(req.body,null,2));
    // Before save salt the password
    
    user.save(function(err,user){
        console.log('Error var');
        if(!err){
            console.log('Error yok');
            res.send(user);
        }
    });
};
//When user sign in it controls email and password true or not 
exports.signUser = function(req,res,next){
    console.log('body', req.body);
         var email = req.body.email;
         var password = req.body.password;
         console.log('email', email);
         console.log('pass', password);
         User.findOne({email:email,password:password}, function(err,user){
             if(err){
                 console.log(err);
                 return res.status(500).send();
             }
             if(!user){
                 return res.status(404).send();
             }
             return res.status(200).send();
         })
};
