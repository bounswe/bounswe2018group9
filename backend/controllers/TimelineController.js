const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const _ = require('lodash');

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
    } else {
        limit = Number.req.query.limit;
    }

    Event.paginate(
        {"creator": userId}, 
        {offset: skipVar, limit: limitVar})
    .then((result) => {
      if (!result.docs){
        res.status(404);
        res.send('No event found with creator id: ' + userId);
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

module.exports = {
    getOwnEvents
};