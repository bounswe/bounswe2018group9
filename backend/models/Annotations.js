var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BodySchema = new Schema({
    'type': {type: String, required: true},
    value: { type: String, required: true},
    format: { type: String, required: false},
    language: {type: String, required: false}
}, {_id: false});

var TextSelectorSchema = new Schema({
    'type': "TextPositionSelector",
    start: {type: Number, required: true},
    end: {type: Number, required: true}
}, {_id: false});

// This is a placeholder. I couldn't figure out how we should generate selectors for images yet :/
var ImageSelectorSchema = new Schema({
    placeholder:{type: String, required: true}
}, {_id: false});

var AnnotationSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    '@context': { type: String, required:true, default:"http://www.w3.org/ns/anno.jsonld" },
    'type': { type: String, required: true, default:"Annotation"},
    body: {
        type: [BodySchema],
        required: false
    },
    target: {
        source: {
            // This refers to what is being annotated.
            // For example, "desc" is for description of an event and "interests" could be for annotations on a user's interests
            // Note that source should in fact be either an object or a URI
            // In this case, since the annotations are stored per event or user, "desc" will identify the object being annotated uniquely
            // thus we can think of it as the URI of the target
            type: "desc" || "date" || "artists" || "loc" || "interests", //etc.
            required: true
        },
        selector: {
            type: TextSelectorSchema || ImageSelectorSchema,
            required: false
        }
    }
});

module.exports = AnnotationSchema;