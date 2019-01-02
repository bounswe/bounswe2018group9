// Global packages
const express = require('express');

// Data Models  
const Event = require('../models/Event')
const User = require('../models/User'); 

function search(req,res,next) {
    const searchQuery = req.query.search;
    let response = {};

    const regexedSearchQuery = new RegExp(escapeRegex(searchQuery), 'gi');
    User.find({ "name" : regexedSearchQuery })
        .exec()
        .then((users) => {
            response.users = users;
            return Event.find({ "name" : regexedSearchQuery })
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

function locationSearch(req,res,next) {
    const latLower = req.query.latLower;
    const latHigher = req.query.latHigher;
    const lngHigher = req.query.lngLower;
    const lngLower = req.query.lngLower;

    Event.find({ 
        location: { 
            coordinates: { 
                lat: { 
                    $gte: latLower, 
                    $lte: latHigher
                }, 
                lng:{ 
                    $gte: lngLower, 
                    $lte: lngHigher
                }
            }
        }
        })
        .exec()
        .then((events) => {
            res.status(200);
            res.send(events);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

function advancedSearch(req,res,next){
    const searchQuery = req.query.search;
    const regexedSearchQuery = new RegExp(escapeRegex(searchQuery),'gi');

    let response = {}
    let searchParams = {}

    searchParams.name = regexedSearchQuery;

    // Get query params
    // Location
    const latLower = req.query.latLower;
    const latHigher = req.query.latHigher;
    const lngHigher = req.query.lngLower;
    const lngLower = req.query.lngLower;

    // Time
    const beforeThan = req.query.beforeThan;
    const afterThan = req.query.afterThan;

    // Price
    const lowPrice = req.query.lowPrice;
    const highPrice = req.query.highPrice;
    const currency = req.query.currency;

    // Tags
    const tags = null;
    if (req.query.tags) {
        tags = req.query.tags.split(',');
    }
    

    // Construct the search params object
    if (latLower && latHigher && lngHigher && lngLower){
        searchParams.location = { 
            coordinates: { 
                lat: { 
                    $gte: latLower, 
                    $lte: latHigher
                }, 
                lng:{ 
                    $gte: lngLower, 
                    $lte: lngHigher
                }
            }
        };
    }

    // Time
    // TODO: Parse date correctly according to frontend input.
    if (beforeThan && afterThan){
        searchParams.date = { 
            $gte: afterThan, 
            $lte: beforeThan
        };
    }

    // Price
    if (lowPrice && highPrice && currency){
        searchParams.price = {
            amount: {
                $gte: afterThan, 
                $lte: beforeThan
            },
            currency: currency
        };
    }

    // Tag Search
    if (tags) {
        searchParams.tags = {
            $in: tags
        }
    }

    // Finally get the events 
    Event.find(searchParams)
        .populate('creator')
        .populate('attendance.user')
        .exec()
        .then((events) => {
            res.status(200);
            res.send(events);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
}

// Escapes the search query strings for bad input. 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = {
    search,
    advancedSearch,
    locationSearch
}