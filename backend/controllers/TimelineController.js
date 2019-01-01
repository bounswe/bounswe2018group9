const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const _ = require('lodash');

function getWillAttendEvents(req,res,next) {
    
    let userId = req.params.id;

    User.findById(userId)
        .populate('willAttendEvents')
        .exec()
        .then((user) => {
            res.status(200);
            res.send({
                willAttendEvents: user.willAttendEvents
            });
        })
        .catch(() => {
            res.status(404);
            res.send({
                msg:"You haven't attended to any events yet"
            });
        });
}

function getOwnEvents(req,res,next)
{
    let skip, limit;
    let userId = req.params.id;

    if (!req.query.skip){
        skip = 0;
    } else {
        skip = Number(req.query.skip);
    }

    if(!req.query.limit)
    {
        limit = 0;
    } 
    else {
        limit = Number.req.query.limit;
    }

    Event.paginate(
        {"creator": userId}, 
        {offset: skipVar, limit: limitVar})
    .then((result) => {
      if (!result.docs){
        res.status(404);
        res.send({msg: 'No event found with creator id: ' + userId});
      } else {
        res.status(200);
        res.send(result.docs);
      }
    })
    .catch((err)=>{
      res.status(500);
      res.send({err})
    });
}

function getWillNotAttendEvents(req,res,next) {
    let userId = req.params.id;

    User.findById(userId)
        .populate('willNotAttendEvents')
        .exec()
        .then((user) => {
            res.status(200);
            res.send({
                willNotAttendEvents: user.willNotAttendEvents
            });
        })
        .catch(() => {
            res.status(404);
            res.send("There is something wrong");
        });
}

function getMayAttendEvents(req,res,next) {
    let userId = req.params.id;

    User.findById(userId)
        .populate('mayAttendEvents')
        .exec()
        .then((user) => {
            res.status(200);
            res.send({
                mayAttendEvents: user.mayAttendEvents
            });
        })
        .catch(() => {
            res.status(404);
            res.send("There is no event that you may be attending.");
        });
}

module.exports = {
    getOwnEvents,
    getWillAttendEvents,
    getWillNotAttendEvents,
    getMayAttendEvents
};