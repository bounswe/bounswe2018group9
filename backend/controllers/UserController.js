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

function updateUser(req,res,next) {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {new: true})
        .exec()
        .then((user)=>{
            res.status(200);
            res.send({updatedUser: user});
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        })
}

function getUserById(req,res,next) {
    const id = req.params.id;

    User.findById(id)
        .exec()
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((err) => {
            res.status(404);
            res.send({err});
        });
}

function addUser(req,res,next) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        details: req.body.details,
        followers: [],
        following: [],
        interests: []
    });

    user.save()
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
};

// This will be private later. Only will be used from follow and unfollow.
function addFollower(req,res,next){
    User.findOneAndUpdate({_id: req.params.id}, {$push: {follower: req.body.id}}, {new: true})
        .exec()
        .then((user)=>{
            res.status(200);
            res.send({follower: user.follower});
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        });
}

// This will be private later. Only will be used from follow and unfollow.
function removeFollower(req,res,next) {
    User.update({_id:req.params.id}, {$pull: {follower: req.body.id}}, {new: true})
        .exec()
        .then((user)=>{
            res.status(200);
            res.send({follower: user.follower});
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        });
}

function follow(req,res,next){
    User.findOneAndUpdate({_id: req.params.id}, {$push: {following: req.body.id}}, {new: true})
        .exec()
        .then((user)=>{
            User.findOneAndUpdate({_id: req.body.id}, {$push: {followers: req.params.id}}, {new: true})
            .exec()
            .then(()=>{
                res.status(200);
                res.send({following: user.following});
            })
            .catch((err)=>{
                res.status(500);
                res.send({err});
        });
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        });
}

function unfollow(req,res,next) {
    User.update({_id:req.params.id}, {$pull: {following: req.body.id}}, {new: true})
        .exec()
        .then((user)=>{
            User.update({_id:req.body.id}, {$pull: {followers: req.params.id}}, {new: true})
            .exec()
            .then(()=>{
                res.status(200);
                res.send({following: user.following});
            })
            .catch((err)=>{
                res.status(500);
                res.send({err});
        });
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        });
}

function getFollowers(req,res,next){
    User.findById(req.params.id)
        .exec()
        .then((user) => {
            res.status(200);
            res.send({following: user.followers});
        })
        .catch((err) => {
            res.status(404);
            res.send({err});
        });
}

function getFollowing(req,res,next){
    User.findById(req.params.id)
        .exec()
        .then((user) => {
            res.status(200);
            res.send({following: user.following});
        })
        .catch((err) => {
            res.status(404);
            res.send({err});
        });
}

function deleteUser(req,res,next) {
    User.findOneAndDelete({_id: req.params.id})
        .exec()
        .then((user)=>{
            res.status(200);
            res.send({deletedUser: user});
        })
        .catch((err)=>{
            res.status(500);
            res.send({err});
        })
}



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

module.exports = {
    getAllUsers,
    addUser,
    getUser,
    getUserById,
    addFollower,
    removeFollower,
    follow,
    unfollow,
    deleteUser,
    updateUser,
    getFollowers,
    getFollowing
}
