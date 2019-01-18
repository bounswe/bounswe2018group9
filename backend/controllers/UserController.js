var mongoose = require("mongoose");
var User = require("../models/User");
const Event = require("../models/Event");

var jwt = require("jsonwebtoken");
var secretkey = 'gjkNLnkjBKADJnaldkNADEJMLsmellycat';

function getAllUsers(req,res,next) {
    
    User.find({})
        .populate('follower')
        .populate('following')
        .exec()
        .then((users) => {
            res.status(200);
            res.send(users);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
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
        .populate('willAttendEvents')
        .populate('mayAttendEvents')
        .populate('willNotAttendEvents')
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

// TODO: BURAYA BAK BIR SEY BOZULURSA
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
        .populate('follower')
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
        .populate('follower')
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
        .populate('following')
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
        .populate('following')
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


//MEDIA ENDPOINT HANDLERS

function getAvatar(req, res, next){
    /* Validation here */
    User.findById(req.params.id)
      .exec()
      .then((user) => {
        res.status(200);
        res.send({avatar: user.media.avatar});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

  function getCover(req, res, next){
    /* Validation here */
  
    User.findById(req.params.id)
      .exec()
      .then((user) => {
        res.status(200);
        res.send({cover: user.media.cover});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

function addAvatar(req, res, next){
    /* Validation here */
  
    const opt = { new: true };
  
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.avatar": req.body} }, opt)
      .exec()
      .then((updatedUser) => {
        res.status(200);
        res.send({updatedUser: updatedUser});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

  function addCover(req, res, next){
    /* Validation here */
  
    const opt = { new: true };
  
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.cover" : req.body} }, opt)
      .exec()
      .then((updatedUser) => {
        res.status(200);
        res.send({updatedUser: updatedUser});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

  function updateAvatar(req, res, next){
    /* Validation here */
  
    const opt = { new: true };
  
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.avatar" : req.body} }, opt)
      .exec()
      .then((updatedUser) => {
        res.status(200);
        res.send({updatedUser: updatedUser});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

  function updateCover(req, res, next){
    /* Validation here */
  
    const opt = { new: true };
  
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.cover" : req.body} }, opt)
      .exec()
      .then((updatedUser) => {
        res.status(200);
        res.send({updatedUser: updatedUser});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  };

  function deleteAvatar(req, res, next){
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.avatar" : {}} })
    .exec()
    .then((updatedUser) => {
      res.status(200);
      res.send({updatedUser: updatedUser});
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
  };

  function deleteCover(req, res, next){
    User.findByIdAndUpdate(req.params.id,{ $set: {"media.cover" : {}} })
    .exec()
    .then((updatedUser) => {
      res.status(200);
      res.send({updatedUser: updatedUser});
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
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
    getFollowing,
    getAvatar,
    getCover,
    addAvatar,
    addCover,
    updateAvatar,
    updateCover,
    deleteAvatar,
    deleteCover
}

