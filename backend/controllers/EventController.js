const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");
const EventSchema = Event.EventSchema;
const assert = require('assert') 

const _ = require('lodash');

function addEvent(req, res, next) {
  var event = new Event(req.body);

  event.save()
    .then((event) => {
      res.status(200);
      res.send({event});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

function updateEvent(req, res, next){
  /* Validation here */

  const updateOptions = { new: true};

  //Tried to just owner can update 
  Event.findByIdAndUpdate( {'owner' : req.params.id},{ $set: req.body }, updateOptions)
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
    .populate("comments")
    .exec()
    .then((event) => {
      res.status(200);
      res.send(event);
    })
    .catch((err)=>{
      res.status(404);
      res.send(err);
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

// This function deletes the event according to given id and returns the deleted event.
// If it doesn't exist, it returns 500 response and error message.
function deleteEvent(req,res,next) {
  let eventId = req.params.id;

  Event.findByIdAndRemove(eventId, (err,event) => {
    if (err) {
      return res.status(500).send(err);
    }
    const response = {
      message: "Event is succesfully deleted.",
      event: event
    }

    return res.status(200).send(response);
  });
}


function addAttendance(req,res,next){
  const eventId = req.params.id;
  const options = {new: true};

  Event.findOneAndUpdate({_id: eventId}, {$push: {attendance: req.body}}, options)
    .exec()
    .then((event) => {
      res.status(200);
      res.send({updatedAttendance: event.attendance});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};


function getAttendance(req,res,next){
  const eventId = req.params.id;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send({attendance: event.attendance});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

function updateAttendance(req,res,next){
  const eventId = req.params.id;
  const userId = req.body.user;
  const attendanceType = req.body.attendanceType;
  const options = {new: true, upsert: true};

  Event.findOneAndUpdate({"id": eventId, "attendance.user": userId}, {$set: {attendanceType: attendanceType} }, options)
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({attendance: event.attendance});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
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
        res.send(err);
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
        res.send(err);
    });
}

function updateComment(req,res,next) {
  const eventId = req.params.id;
  const commentId = req.params.commentId;
  const options = { upsert: true, new: true };
  Event.findOneAndUpdate({"_id": eventId, "comments._id": commentId}, {"$set": {"comments.$": req.body} }, options)
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({comments: event.comments});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}

function getComments(req,res,next){
  const eventId = req.params.id;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send({comments: event.comments});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

function vote(req,res,next){
  const eventId = req.params.id;
  const senderId = req.body.voterId;
  const isUpvote = req.body.isUpvote; 
  console.log(senderId);
  Event.findById(eventId)
    .exec()
    .then((event) => {
      User.findById(senderId)
      .then((user) => {
        if(isUpvote){
          event.upvote(user, function(err, doc) {
            assert.equal(doc, event);  // true
          });
        } 
        else {
          event.downvote(user, function(err, doc) {
            assert.equal(doc, event);  // true
          });
        }
        res.status(200);
        res.send("Voted succesfully.");
      })
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
}

function getVotes(req,res,next){
  const eventId = req.params.id;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send({
        votes: event.votes(), 
        upvotes: event.upvotes(), 
        downvotes: event.downvotes()
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
};

function unvote(req,res,next){
  const eventId = req.params.id;
  const voterId = req.body.voterId;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      User.findById(voterId)
      .exec()
      .then((user) => {
        console.log(user);
        event.unvote(user,(err,doc)=>{
          assert.equal(doc, event);
        });
        res.status(200);
          res.send({vote : event.votes() });
         
      })
      
    })
    .catch((err) => {
      res.status(500);
      res.send({err});
    });
};


// MEDIA CONTROLLERS
function addMedia(req,res,next){
  Event.findOneAndUpdate({_id: req.params.id}, {$push: {media: req.body}}, {new: true})
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({media: event.media});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}

function getMedia(req,res,next){
  const eventId = req.params.id;

  Event.findById(eventId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send({media: event.media});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });

}


function deleteMedia(req,res,next) {
  Event.findOneAndUpdate({_id: req.params.id}, {$pull: {media: { _id:req.params.mediaId }}}, {new: true})
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({media: event.media});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}

function updateMedia(req,res,next) {
  const eventId = req.params.id;
  const mediaId = req.params.mediaId;
  const options = { upsert: true, new: true };
  Event.findOneAndUpdate({"_id": eventId, "media._id": mediaId}, {"$set": {"media.$": req.body} }, options)
    .exec()
    .then((event)=>{
        res.status(200);
        res.send({media: event.media});
    })
    .catch((err)=>{
        res.status(500);
        res.send(err);
    });
}




module.exports = {
  addEvent,
  updateEvent,
  getEventbyId,
  getEventbyCreator,
  getAllEvents,
  deleteEvent,
  addAttendance,
  getAttendance,
  updateAttendance,
  getVotes,
  unvote,
  vote,
  addComment,
  deleteComment,
  updateComment,
  getComments,
  addMedia,
  deleteMedia,
  updateMedia,
  getMedia
  //getAllMedia
};
