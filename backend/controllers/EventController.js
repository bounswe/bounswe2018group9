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


// needs params: id(owner id as string), page(integer), limit(integer)
// will return array of event objects with <limit> elements starting from (<page>-1)*<limit>th object in the db  
exports.getEventbyOwner = function(req,res,next)
{
  console.log("Searching owner : " + req.query.id);
    Event.paginate({'owner' : req.query.id}, {page:Number(req.query.page), limit: Number(req.query.limit)},function(err, result)
    {
      if(err || !result.docs)
      {
        res.send("No event found with creator id: " + req.query.id);
      }
      else
      {
        res.send(result.docs);
      }
    });
}

// needs params: page(integer), limit(integer)
// will return array of event objects with <limit> elements starting from (<page>-1)*<limit>th object in the db 
exports.getAllEvents = function(req,res,next)
{
  Event.paginate({}, {page: Number(req.query.page), limit: Number(req.query.limit)},function(err, result)
  {
    console.log("err : "+err);
    if(err || !result.docs)
    {
      res.send("No event found with creator id: " + req.query.id);
    }
    else
    {
      res.send(result.docs);
    }
  });
}
