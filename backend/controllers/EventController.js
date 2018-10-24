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
  console.log('request: '+JSON.stringify(req.body,null,2));
  event.save(function(err,event)
  {
      if(!err){
        console.log('Error yok');
        res.send(event);
      }
      else
      {
         console.log('Error: '+err.message);
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
  }
  );
}
exports.getEventbyOwner = function(req,res,next)
{
  console.log("Searching owner : " + req.params.id);
    Event.find({'owner' : req.params.id}, function(err, docs)
    {
      if(err || !docs)
      {
        res.send("No event found with creator id: "+ req.params.id);
      }
      else
      {
        res.send(docs);
      }
    });
}

exports.getAllEvents = function(req,res,next)
{
    Event.find({}, function(err, docs)
    {
      if(err || !docs)
      {
        res.send("No events found");
      }
      else
      {
        res.send(docs);
      }
    });
}
