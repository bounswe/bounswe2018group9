// Global packages
const express = require('express');

// Data Models  
const Event = require('../models/Event')
const User = require('../models/User'); 

function search(req,res,next) {
    
    const searchQuery = req.query.search;
    
    // Are you searching for searching users or events?
    // If searching for users.
    const isUser = req.query.isUser;
    if (isUser) {
        const regexedSearchQuery = new RegExp(escapeRegex(searchQuery), 'gi');
        User.find({ $text: { $search : regexedSearchQuery }})
            .exec()
            .then((users) => {
                res.status(200);
                res.send(users);
            })
            .catch((err)=> {
                res.status(404);
                res.send(err);
            });
    } else {
        const regexedSearchQuery = new RegExp(escapeRegex(searchQuery), 'gi');
        Event.find({ $text: { $search : regexedSearchQuery }})
            .exec()
            .then((events) => {
                res.status(200);
                res.send(events);
            })
            .catch((err)=> {
                res.status(404);
                res.send(err);
            });
    }
}

// Escapes the search query strings for bad input. 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = {
    search
}