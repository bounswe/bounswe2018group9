const mongoose = require("mongoose");
const Event = require("../../models/Event");
const User = require("../../models/User");

const _ = require("lodash");


function willAttend(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    User.findById(userId)
        /*.populate('willNotAttendEvents')
        .populate('mayAttendEvents')
        .populate('willAttendEvents')*/
        .exec()
        .then((user) => {
            let newUser = user;
            console.log(user);
            // Subtract the event if it is in one of the other lists.
            /*user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return element.id === eventId;
            });*/
            
            _.remove(user.willAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            _.remove(user.willNotAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            _.remove(user.mayAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });

            // Now add it to the new place
            let valueToAdd = mongoose.Types.ObjectId(eventId);
            user.willAttendEvents.push(valueToAdd);
            
            _.remove(user.willNotAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            
            _.remove(user.mayAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });

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

    console.log('9999', eventId);
    User.findById(userId)
        /*.populate('willNotAttendEvents')
        .populate('mayAttendEvents')
        .populate('willAttendEvents')*/
        .exec()
        .then((user) => {
            
            console.log(user);
            // Subtract the event if it is in one of the other lists.
/*
            user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return element.id === eventId;
            });*/

            _.remove(user.willAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            
            _.remove(user.willNotAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            
            _.remove(user.mayAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });

            // Now add it to the new place

            let valueToAdd = mongoose.Types.ObjectId(eventId);

            user.mayAttendEvents.push(valueToAdd);
            
            _.remove(user.willAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            
            _.remove(user.willNotAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
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
        /*.populate('willNotAttendEvents')
        .populate('mayAttendEvents')
        .populate('willAttendEvents')*/
        .exec()
        .then((user) => {
            let newUser = user;
            console.log(user);
            // Subtract the event if it is in one of the other lists.
/*
            user.willAttendEvents = _.filter(user.willAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.willNotAttendEvents = _.filter(user.willNotAttendEvents, (element) => {
                return element.id === eventId;
            });

            user.mayAttendEvents = _.filter(user.mayAttendEvents, (element) => {
                return element.id === eventId;
            });*/   

            _.remove(user.willAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            _.remove(user.willNotAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            _.remove(user.mayAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });

            // Now add it to the new place

            let valueToAdd = mongoose.Types.ObjectId(eventId);

            user.willNotAttendEvents.push(valueToAdd);
            
            _.remove(user.mayAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });

            _.remove(user.willAttendEvents, (element) => {
                console.log(element, eventId)
                console.log(element == eventId);
                return element == eventId;
            });
            return user.save();
        })
        .then((user) => {
            res.status(200);
            res.send({
                willNotAttendEvents: user.willNotAttendEvents
            });
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

// Don't DELETE THIS, THIS MIGHT BE THE SOLUTION FOR THE BUG.
/*
function willAttend2(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    let options = {
        new: true
    }
    User.findOneAndUpdate(
        {"_id": userId}, 
        {"$pull": {
                // "willAttendEvents.$": eventId, 
                "willNotAttendEvents.$": eventId,
                "mayAttendEvents.$": eventId,
            },
            "$set": {
                "willAttendEvents.$": eventId, 
            }
    }, options)
    .exec()
    .then((user)=>{
        res.status(200);
        res.send({willAttend: user.willAttendEvents});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}

function mayAttend2(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;
    let options = {
        new: true
    } 

    User.findOneAndUpdate(
        {"_id": userId}, 
        {   
            "$pull": {
                "willAttendEvents.$": eventId, 
                // "mayAttendEvents.$": eventId,
                "willNotAttendEvents.$": eventId,
            },
            "$set": {
                "mayAttendEvents.$": eventId, 
            }
    }, options)
    .exec()
    .then((user)=>{
        res.status(200);
        res.send({mayAttend: user.mayAttendEvents});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}

function willNotAttend2(req,res,next){
    let userId = req.params.id;
    let eventId = req.body.eventId;

    let options = {
        new: true
    }

    User.findOneAndUpdate(
        {"_id": userId}, 
        {"$pull": {
                "willAttendEvents.$": eventId, 
                "mayAttendEvents.$": eventId,
                // "willNotAttendEvents.$": eventId,
            },
            "$set": {
                "willNotAttendEvents.$": eventId, 
            }
    }, options)
    .exec()
    .then((user)=>{
        res.status(200);
        res.send({willNotAttend: user.willAttendEvents});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}
*/

module.exports = {
    /*willAttend: willAttend2,
    willNotAttend: willNotAttend2,
    mayAttend: mayAttend2*/
    willAttend,
    willNotAttend,
    mayAttend
}