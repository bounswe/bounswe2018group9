var mongoose = require("mongoose");
var Event = require("../models/Event");






exports.addEvent = function(req,res,next){
  var event = new Event({
    name: req.body.name,
    price: req.body.price,
    owner: req.body.owner,
    description: req.body.description,
    date: req.body.date
  });
  console.log('request: ' + JSON.stringify(req.body,null,2));
  event.save(function(err,event)
  {
      if(!err){
        console.log('Error yok');
        res.send(event);
      }
      else
      {
        console.log('Error: ' + err.message);
      }
  });
}

exports.getEventbyId = function(req, res, next)
{
  search_id = req.params.id;
  console.log(search_id);
  Event.findById(search_id, function(err, ev)
  {
    if(!err)
    {
      res.send(ev);
    }
    else
    {
      res.send("No event found with id: " + search_id);
    }
  });
}


// needs params: id(owner id as string), skip(integer, default 0), limit(integer, default 10)
// will return array of event objects with <limit> elements starting from object number <skip> in the db 
exports.getEventbyOwner = function(req,res,next)
{
  console.log("Searching owner : " + req.params.id);
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
  Event.paginate({'owner' : req.params.id}, {offset: skipVar, limit: limitVar},function(err, result)
    {
      if(err || !result.docs)
      {
        res.send("No event found with creator id: " + req.params.id);
      }
      else
      {
        res.send(result.docs);
      }
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
  Event.paginate({}, {offset: skipVar, limit: limitVar},function(err, result)
    {
      if(err || !result.docs)
      {
        res.send("No events found");
      }
      else
      {
        res.send(result.docs);
      }
    });
}
