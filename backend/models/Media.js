const mongoose = require('mongoose');
// var mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  source: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    enum: [0, 1], // '0' for images, '1' for videos
    default: 0
  },
});

module.exports = MediaSchema;
