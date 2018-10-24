var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Import Models
var UserModel = require("./User");
// Definition
var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true    
    },

    owner: {//id of the associated User object
        type: String, 
        required: true
    },

    willAttendUser: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },

    maybeAttendUser: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },

    notAttendUser: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    
    attendedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },

    blockedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },

    /*
    location-construct: {
        //location construct here,
        required: false
    },
    
    comments: {
        
    }
    
    tags:{
        
    }
    */
});

var Event = mongoose.model('Event',EventSchema);

module.exports = Event;