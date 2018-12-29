// Global packages
const express = require('express');

// Data Models  
const Event = require('../models/Event')
const User = require('../models/User'); 
const EventController = require('./EventController');

const _ = require('lodash');

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

function locationSearch(req,res,next) {
    const latLower = req.query.latLower;
    const latHigher = req.query.latHigher;
    const longHigher = req.query.longLower;
    const longLower = req.query.longLower;

    Event.find({ location: { coordinates: { lat: { $gte: latLower, $lte: latHigher}, long:{ $gte: longLower, $lte: longHigher}}}})
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

    // Get query params
    // Location
    const latLower = req.query.latLower;
    const latHigher = req.query.latHigher;
    const longHigher = req.query.longLower;
    const longLower = req.query.longLower;

    // Time
    const beforeThan = req.query.beforeThan;
    const afterThan = req.query.afterThan;

    // Price
    const lowPrice = req.query.lowPrice;
    const highPrice = req.query.highPrice;
    const currency = req.query.currency;

    // Construct the search params object
    if (latLower && latHigher && longHigher && longLower){
        searchParams.location = { 
            coordinates: { 
                lat: { 
                    $gte: latLower, 
                    $lte: latHigher
                }, 
                long:{ 
                    $gte: longLower, 
                    $lte: longHigher
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

    // Finally get the events 
    Event.find(searchParams)
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

function getFeed(req,res,next){

    let events=[];
    let userId = req.params.id;
    let followedUsers;
    let usr=User.findById(userId);
    User.findById(userId)
        .exec()
        .then((user) => {
            followedUsers=user.following;
            followedUsers.forEach((followed) => {
                events=events.concat(EventController.getRelatedEvents(followed));
            });
            events=events.concat(EventController.getRelatedEvents(userId));
            res.status(200);
            res.send(events);
        })
        .catch((err) => {
            res.status(404);
            res.send({err});
        });

}

module.exports = {
    search,
    advancedSearch,
    locationSearch,
    getFeed
} 