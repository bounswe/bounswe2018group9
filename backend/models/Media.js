var mongoose = require('mongoose');
//var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

const MediaSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    link: {
        type: String,
        required: true
    },

    filename: {
        type: String,
        required: true
    },

    filesize: {
        type: Number,//in KB
        default: 0
    },

    annotations: {
      //THIS IS A PLACE HOLDER DEFINITION
        type: String,
        default: ""
    },
    //0 for image, 1 for video
    media_type:{
        type: Number,
        default: 0
    }
});

module.exports = MediaSchema;