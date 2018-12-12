var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BodySchema = new Schema({
    'type': {type: String, required: true},
    value: { type: String, required: true},
    format: { type: String, required: false},
    language: {type: String, required: false}
}, {_id: false});

var TextPositionSelector = new Schema({
    'type': "TextPositionSelector",
    start: {type: Number, required: true},
    end: {type: Number, required: true}
}, {_id: false});

// This is a placeholder. I couldn't figure out how we should generate selectors for images yet :/
var MediaFragmentSelector = new Schema({
    placeholder:{type: String, required: true}
}, {_id: false});

var TextFragmentSelector = new Schema({

}, {_id: false});

var SelectorSchema = new Schema({
    type: TextPositionSelector || TextFragmentSelector || MediaFragmentSelector
}, {_id: false});


var SpecificResource = new Schema({
    
}, {_id: false});

var AnnotationSchema = new Schema({
    '@context': { type: String, required:true, default:"http://www.w3.org/ns/anno.jsonld" },
    'type': { type: String, required: true, default:"Annotation"},
    body: {
        type: [BodySchema],
        required: false
    },
    target: {
        source: {
            type: String,
            required: true
        },
        selector: {
            type: TextSelectorSchema || ImageSelectorSchema,
            required: false
        }
    }
});

var Annotation = mongoose.model('Annotation', AnnotationSchema);

module.exports = Annotation;