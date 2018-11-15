var mongoose = require("mongoose");
var Event = require("../models/Event");

const _ = require('lodash');

exports.addEvent = function(req,res,next){
  var event = new Event({
    name: req.body.name,
    price: req.body.price,
    owner: req.body.owner,
    artists: req.body.artists,
    description: req.body.description,
    date: req.body.date
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
}

exports.updateEventbyId = function(req, res, next)
{
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

  Event.findByIdAndUpdate(
    //Object Id
    req.params.id,
    
    //Changes to be made
    {
      "name": req.body.name,
    
      "price": req.body.price,
  
      "description": req.body.description,
  
      "date": req.body.date,
  
      "artists": req.body.artists,
  
      "blockedUsers": req.body.blockedUsers
    },

    //Ask mongoose to return the new version of the object
    {new: true},

    //Callback
    (err, newEvent) => {
      if(err)
      {
        res.status(500).send();
      }
      else if(!newEvent)
      {
        res.status(404).send();
      }
      else
      {
        res.status(200).send(newEvent);
      }
    }
    
    );
}
exports.getEventbyId = function(req, res, next)
{
  searchId = req.params.id;

  Event.findById(searchId)
    .exec()
    .then((event) => {
      res.status(200);
      res.send(event);
    })
    .catch((err)=>{
      res.status(404);
      res.send('No event found with id: ' + searchId);
    });
}


// needs params: id(owner id as string), skip(integer, default 0), limit(integer, default 10)
// will return array of event objects with <limit> elements starting from object number <skip> in the db 
exports.getEventbyOwner = function(req,res,next)
{
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
}

// needs params: skip(integer, default 0), limit(integer, default 10)
// will return array of event objects with <limit> elements starting from object number <skip> in the db 
exports.getAllEvents = function(req,res,next)
{
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
}

exports.updateAttendee = function(req,res,next){
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
      attendanceInfo = _.map((el)=>{
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
    Event.findByIdAndUpdate(eventId,
      {attendanceInfo:attendanceInfo},
      {new:true},(err,newEvent)=>{
        if (err) {
          res.status(500);
          res.send({err})
        } else {
          res.status(200);
          res.send(newEvent);
        }
      });
  });
}