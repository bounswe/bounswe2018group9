const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const _ = require("lodash");

function getFeedForUserWithId(req,res,next) {
    let userId = req.params.id


}

module.exports = {
    getFeedForUserWithId
}