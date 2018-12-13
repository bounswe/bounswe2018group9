var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//WE DO NOT ALLOW EXTERNAL RESOURCES AND SELECTORS FOR BODIES!!!!
var BodySchema = new Schema({
    'type': {type: String, required: true}, //TextualBody for texts, XXXXXXXXX for media
    value: { type: String, required: true},
    format: { type: String, required: false}, //consult http://www.iana.org/assignments/media-types/media-types.xhtml
    language: {type: String, required: false} // consult https://www.w3.org/International/articles/language-tags/
}, {_id: false});

var SelectorSchema= new Schema({},
    { discriminatorKey: 'type', _id: false });

//THIS SCHEMA MEANS WE ONLY ALLOW SPECIFICRESOURCES AS TARGETS!!
var SpecificResourceSchema = new Schema({
    //URI of the target
    source: {
        type: String,
        required: true
    },

    selector:{
        type: SelectorSchema,
        required: true
    },

    refinedBy:{
        type:[SelectorSchema],
        required:false
    }
});

SpecificResourceSchema.path('selector').discriminator('TextPositionSelector', new Schema({
    start: {
        type: Number,
        required: true //required for TextPositionSelector type selectors
    },
    end: {
        type: Number,
        required: true
    }
  }, { _id: false }));

  SpecificResourceSchema.path('selector').discriminator('XPathSelector', new Schema({
    value: {
        type: String,
        required: true //Required for XPathSelector and FragmentSelector type selectors
    }
  }, { _id: false }));

  SpecificResourceSchema.path('selector').discriminator('FragmentSelector', new Schema({
    conformsTo:{
        type: String,
        default: "http://www.w3.org/TR/media-frags/", //????????????????
        required: true 
    },
    value: {
        type: String,
        required: true
    }
  }, { _id: false }));

  SpecificResourceSchema.path('refinedBy').discriminator('TextPositionSelector', new Schema({
    start: {
        type: Number,
        required: true //required for TextPositionSelector type selectors
    },
    end: {
        type: Number,
        required: true
    }
  }, { _id: false }));

  SpecificResourceSchema.path('refinedBy').discriminator('XPathSelector', new Schema({
    value: {
        type: String,
        required: true //Required for XPathSelector and FragmentSelector type selectors
    }
  }, { _id: false }));

  SpecificResourceSchema.path('refinedBy').discriminator('FragmentSelector', new Schema({
    conformsTo:{
        type: String,
        default: "http://www.w3.org/TR/media-frags/", //????????????????
        required: true 
    },
    value: {
        type: String,
        required: true
    }
  }, { _id: false }));


  

var AnnotationSchema = new Schema({
    '@context': { type: String, required:true, default:"http://www.w3.org/ns/anno.jsonld" },
    'type': { type: String, required: true, default:"Annotation"},
    body: {
        type: [BodySchema],
        required: false
    },
    target: {
        type:  [SpecificResourceSchema],
        required: true
    }
});

var Annotation = mongoose.model('Annotation', AnnotationSchema);

module.exports = Annotation;