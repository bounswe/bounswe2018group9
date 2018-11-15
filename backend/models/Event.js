var mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

// Model Imports
var UserModel = require("./User");

var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    price: {
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true    
    },

    created: {
        type: Date,
        required: false
    }

    owner: {
        type: String, 
        required: true
    },

    artists: {
        type: [String],
        required: false
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
EventSchema.plugin(mongoosePaginate);

var Event = mongoose.model('Event',EventSchema);

module.exports = Event;