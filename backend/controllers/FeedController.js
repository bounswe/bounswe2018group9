const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const _ = require("lodash");

function getFeedForUserWithId(req,res,next) {
    let userId = req.params.id
    let skip = req.query.skip;
    let limit = req.query.limit;

    let response = [];

    // First get the events that he created.
    // If we need populate here append it .
    Event.find({ creator: userId})
        //.populate('comments.author')
        .exec()
        .then((createdEvents) => {
            // Append the events to the response array.
            console.log('1 - Created Events: ', createdEvents);
            response = response.concat(createdEvents);

            return User.findById(userId)
                .populate('following')
                .exec();
        })
        // Now append the events that they created.
        .then((user) => {
            console.log('2 - User', user);
            let followedUsers = user.following;
            return Event.find({ creator: { $in: followedUsers }, tags: { $in: user.interests }})
                //.populate('comments.author')
                .exec()
        })
        // Concat the events that the followed users have created.
        // And then return the ones that the user is attending 
        // And the ones that he may attend.
        // But not the ones that he cant attend
        .then((followedUsersCreatedEvents) => {
            console.log('3 - Followed Users Created Events: ', followedUsersCreatedEvents);
            response = response.concat(followedUsersCreatedEvents);
            return User.findById(userId)
                .populate('mayAttendEvents')
                .populate('willAttendEvents')
                .exec()
        })
        // Append the attended and may attend events
        // And return the events that the friends are attending
        .then((populatedUser) => {
            console.log('4 - User Will Attend Events: ', populatedUser.willAttendEvents);
            console.log('4 - User May Attend Events: ', populatedUser.mayAttendEvents);
            response = response.concat(populatedUser.willAttendEvents);
            response = response.concat(populatedUser.mayAttendEvents);
            // response = uniqueArray(response);
            
            console.log('Response: ', response);
            // Delete the duplicate elements
            response = _.uniqBy(response, '_id');
            response = response.slice(skip, skip + limit);
            console.log(response);
            
            console.log(skip, limit);
            
            res.status(200);
            res.send(response);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

const uniqueArray = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
}

module.exports = {
    getFeedForUserWithId
}