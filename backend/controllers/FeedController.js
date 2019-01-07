const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

const min = new Date(0).getTime();
const max = new Date(8640000000000000).getTime();

function getFeed(req,res,next) {
    const user = req.user;
    const after = req.query.after || min;
    const before = req.query.before || max;
    const event = req.query.event || null;
    const limit = parseInt(req.query.limit);

    Event.find({
        $and: [
            {
                $or: [
                    { _id: { $in: user.willAttendEvents.concat(user.mayAttendEvents) } },
                    { creator: { $in: user.following.concat([ user._id ]) } },
                    { tags: { $in: user.interests } }
                ]
            },
            {
                $or: [
                    { date: { $gte: after, $lte: before, $ne: after  } },
                    { date: before, _id: { $gte: event, $ne: event } }
                ]
            }
        ]
    })
    .limit(limit)
    .sort([['date', 1], ['_id', 1]])
    .exec()
    .then(docs => {
        return res.status(200).send(docs || []);
    })
    .catch(err => {
        return res.status(500).send(err);
    });
}

module.exports = {
    getFeed
}