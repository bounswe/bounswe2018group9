const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const _ = require("lodash");

function getFeedForUserWithId(req,res,next) {
    let userId = req.params.id
    
    let response = [];

    // First get the events that he created.
    // If we need populate here append it .
    Event.find({creator: userId})
        //.populate('comments.author')
        .exec()
        .then((events) => {
            // Append the events to the response array.
            response.concat(events);
            return User.findOne({id: userId})
                .populate('following')
                .exec();
        })
        // Now append the events that they created.
        .then((user) => {
            let followedUsers = user.following;
            
            return Event.find({ creator: { $in: followedUsers }})
                //.populate('comments.author')
                .exec()
        })
        // Concat the events that the followed users have created.
        // And then return the ones 
        .then((events) => {
            response.concat(events);
            // TODO I LEFT THIS PLACE
        })
        // Concat the events that the followed users have created.
        // And then return the ones 
        .then((events) => {
            response.concat(events);
            // TODO I LEFT THIS PLACE
        })
}

module.exports = {
    getFeedForUserWithId
}