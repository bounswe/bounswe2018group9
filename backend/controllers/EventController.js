var mongoose = require("mongoose");
var Event = require("../models/Event");


exports.addEvent = function(req,res,next){
  var event = new Event({
    name: req.body.name,
    price: req.body.price,
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
