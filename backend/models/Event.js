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

    willAttendUser: {
        type: [UserModel.User],
        required: false
    },

    maybeAttendUser: {
        type: [UserModel.User],
        required: false
    },

    notAttendUser: {
        type: [UserModel.User],
        required: false
    },
    
    attendedUsers: {
        type: [UserModel.User],
        required: false
    },

    blockedUsers: {
        type: [UserModel.User],
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