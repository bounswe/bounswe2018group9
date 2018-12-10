var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AnnotationSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true }
});

module.exports = AnnotationSchema;