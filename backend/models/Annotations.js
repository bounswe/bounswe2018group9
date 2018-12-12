var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//WE DO NOT ALLOW EXTERNAL RESOURCES AND SELECTORS FOR BODIES!!!!
var BodySchema = new Schema({
    'type': {type: String, required: true}, //TextualBody for texts, XXXXXXXXX for media
    value: { type: String, required: true},
    format: { type: String, required: false}, //consult http://www.iana.org/assignments/media-types/media-types.xhtml
    language: {type: String, required: false} // consult https://www.w3.org/International/articles/language-tags/
}, {_id: false});

var SelectorSchema = new Schema({
    'type':{
        type: String,
        required: true
    },
    conformsTo:{
        type: String,
        default: "http://www.w3.org/TR/media-frags/", //????????????????
        required: false //required for FragmentSelector type selectors
    },
    value: {
        type: String,
        required: false //Required for XPathSelector and FragmentSelector type selectors
    },
    start: {
        type: Number,
        required: false //required for TextPositionSelector type selectors
    },
    end: {
        type: Number,
        required: false //required for TextPositionSelector type selectors
    },
    refinedBy: {
        type: SelectorSchema,
        required: false
    }
}, {_id: false});



var AnnotationSchema = new Schema({
    '@context': { type: String, required:true, default:"http://www.w3.org/ns/anno.jsonld" },
    'type': { type: String, required: true, default:"Annotation"},
    body: {
        type: [BodySchema],
        required: false
    },
  /*  target: {
        type:  [SpecificResource],
        required: true
    }*/
});

var Annotation = mongoose.model('Annotation', AnnotationSchema);

module.exports = Annotation;