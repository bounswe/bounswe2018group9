const mongoose = require("mongoose");
const Event = require("../../models/Event");
const User = require("../../models/User");

const _ = require("lodash");

function willAttend(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    User.findById(userId)
        .exec()
        .then((user) => {
            let newUser = user;
            
            // Subtract the event if it is in one of the other lists.

            user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                console.log('8888', element);
                return !element === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return !element === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return !element === eventId;
            });

            // Now add it to the new place
            let valueToAdd = mongoose.Types.ObjectId(eventId);
            
            user.willAttendEvents.push(valueToAdd);
            return user.save();
        })
        .then((user) => {
            res.status(200);
            res.send({willAttendEvents: user.willAttendEvents});
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

function mayAttend(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    User.findById(userId)
        .exec()
        .then((user) => {
            
            
            // Subtract the event if it is in one of the other lists.

            user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                return !element === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return !element === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return !element === eventId;
            });

            // Now add it to the new place

            let valueToAdd = mongoose.Types.ObjectId(eventId);

            user.mayAttendEvents.push(valueToAdd);
            return user.save();
        })
        .then((user) => {
            res.status(200);
            res.send({mayAttendEvents: user.mayAttendEvents});
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

function willNotAttend(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    User.findById(userId)
        .exec()
        .then((user) => {
            let newUser = user;
            
            // Subtract the event if it is in one of the other lists.

            user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                return !element === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return !element === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return !element === eventId;
            });

            // Now add it to the new place

            let valueToAdd = mongoose.Types.ObjectId(eventId);

            user.willNotAttendEvents.push(valueToAdd);
            return user.save();
        })
        .then((user) => {
            res.status(200);
            res.send({willNotAttendEvents: user.willNotAttendEvents});
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

module.exports = {
    willAttend,
    willNotAttend,
    mayAttend
}