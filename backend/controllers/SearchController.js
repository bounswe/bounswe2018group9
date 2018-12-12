// Global packages
const express = require('express');

// Data Models  
const Event = require('../models/Event')
const User = require('../models/User'); 

function search(req,res,next) {
    const searchQuery = req.query.search;
    let response = {};

    const regexedSearchQuery = new RegExp(escapeRegex(searchQuery), 'gi');
    User.find({ $text: { $search : regexedSearchQuery }})
        .exec()
        .then((users) => {
            response.users = users;
            return Event.find({ $text: { $search : regexedSearchQuery }})
                .exec();
        })
        .then((events) => {
            response.events = events;
            res.status(200);
            res.send(response); 
        })
        .catch((err)=> {
            res.status(404);
            res.send(err);
        });
}

function advancedSearch(req,res,next){
    const searchQuery = req.query.search;
}

// Escapes the search query strings for bad input. 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = {
    search
}