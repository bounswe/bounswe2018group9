var mongoose = require("mongoose");
var Event = require("../models/Event");

const _ = require('lodash');

function addEvent(req, res, next) {
  
  var event = new Event({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    date: req.body.date,
    duration: req.body.duration,
    created : Date.now(),
    creator: req.body.creator,
    artists: req.body.artists,
    tags: req.body.tags,
    locationConstruct: req.body.locationConstruct,
    medias : req.body.medias,
  });

  event.save()
    .then((event) => {
      res.status(200);
      res.send({event});
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
};

function updateEvent(req, res, next){
  
  /* VALIDATION SHOULD COME HERE */
  if(!(req.body.name))
  {
    res.status(500).send("Name field missing.");
  }
  else if(!(req.body.price))
  {
    res.status(500).send("Price field missing.");
  }
  else if(!(req.body.description))
  {
    res.status(500).send("Description field missing.");
  }
  else if(!(req.body.date))
  {
    res.status(500).send("Date field missing.");
  }
  else if(!(req.body.artists))
  {
    res.status(500).send("Artists field missing.");
  }
  else if(!(req.body.blockedUsers))
  {
    res.status(500).send("Blocked users field missing.");
  }

  const updateOptions = { new: true }; 
  Event.findByIdAndUpdate(req.params.id,{ $set:req.body }, updateOptions)
    .exec()
    .then((updatedEvent) => {
      res.status(200);
      res.send({updatedEvent: updatedEvent});
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
};

function getEventbyId(req, res, next) {
  eventId = req.params.id;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send(event);
    })
    .catch((err)=>{
      res.status(404);
      res.send('No event found with id: ' + eventId);
    });
};

// needs params: id(owner id as string), skip(integer, default 0), limit(integer, default 10)
// will return array of event objects with <limit> elements starting from object number <skip> in the db 
function getEventbyCreator(req,res,next) {
  var skipVar, limitVar;
  if(!req.query.id)
  {
    res.send("Please provide owner id");
  }
 
  if(!req.query.skip)
  {
    skipVar=0;
  }
  else
  {
    skipVar=Number(req.query.skip);
  }
 
  if(!req.query.limit)
  {
    limitVar=10;
  }
  else
  {
    limitVar=Number(req.query.limit);
  }
  Event.paginate({'owner' : req.params.id}, {offset: skipVar, limit: limitVar})
    .then((result) => {
      if (!result.docs){
        res.send('No event found with creator id: ' + req.params.id);
      } else {
        res.status(200);
        res.send(result.docs);
      }
    })
    .catch((err)=>{
      res.status(500);
      res.send({err})
    });
};

// needs params: skip(integer, default 0), limit(integer, default 10)
// will return array of event objects with <limit> elements starting from object number <skip> in the db 
function getAllEvents(req,res,next) {
  
  var skipVar, limitVar;
  if(!req.query.skip)
  {
    skipVar=0;
  }
  else
  {
    skipVar=Number(req.query.skip);
  }
  
  if(!req.query.limit)
  {
    limitVar=10;
  }
  else
  {
    limitVar=Number(req.query.limit);
  }
  
  Event.paginate({}, {offset: skipVar, limit: limitVar})
    .then((result) => {
      if (!result.docs){
        res.send('No events found');
      } else {
        res.status(200);
        res.send(result.docs);
      }
    })
    .catch((err)=>{
      res.status(500);
      res.send({err})
    });
};

function updateAttendee(req,res,next){
  const eventId = req.params.id;
  const userId = req.body.attendant;
  const attendanceType = req.body.attendanceType;

  Event.findById(eventId, (err,event)=>{
    if(err) {
      res.status(500);
      res.send({err});
    } else {
      
      let userAlreadyInTheList = false;
      let attendanceInfo = event.attendance;
      attendanceInfo = _.map(attendanceInfo,(el)=>{
        // Check here if the ids are as it is supposed to be.
        if (el.user === userId) {
          userAlreadyInTheList = true;
          return {
            user: userId,
            attendanceType: attendanceType
          }
        } else {
          return el;
        }
      });
      
      // If the user hasn't entered any attendance info before.
      if (!userAlreadyInTheList) {
        attendanceInfo.push({
          user: userId,
            attendanceType: attendanceType
        })
      }
      
      // Updated Attendance Info 
      return attendanceInfo;
    }
  }, (attendanceInfo)=> {
    Event.findByIdAndUpdate(eventId,{attendanceInfo:attendanceInfo},{new:true})
      .exec()
      .then((updatedEvent) => {
        res.status(200);
        res.send({updatedEvent: updatedEvent});
      })
      .catch((err) => {
        res.status(500);
        res.send({err});
      });
  });
};

function addComment(req,res,next) {
  Event.findOneAndUpdate({_id: req.params.id}, {$push: {comments: req.body}}, {new: true})
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({comments: event.comments});
    })
    .catch((err)=>{
        res.status(500);
        res.send({err});
    });
}

function deleteComment(req,res,next) {
  Event.findOneAndUpdate({_id: req.params.id}, {$pull: {comments: { _id:req.params.commentId }}}, {new: true})
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({comments: event.comments});
    })
    .catch((err)=>{
        res.status(500);
        res.send({err});
    });
}

function updateComment(req,res,next) {
  Event.findOneAndUpdate({"id": req.params.id, "comments.id": req.params.commentId}, {$set: {comment: req.body} }, {new: true})
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({comments: event.comments});
    })
    .catch((err)=>{
        res.status(500);
        res.send({err});
    });
}

module.exports = {
  addEvent,
  updateEvent,
  getEventbyId,
  getEventbyCreator,
  getAllEvents,
  updateAttendee,
  addComment,
  deleteComment,
  updateComment
};