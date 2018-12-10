var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AnnotationSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    '@context': { type: String, required:true, default:"http://www.w3.org/ns/anno.jsonld" },
    'type': { type: String, required: true, default:"Annotation"},
    body: {
        type: BodySchema,
        required: false
    },
    target: {
        source: {
            type: String,
            required: true
        },
        selector: {
            type: SelectorSchema,
            required: false
        }
    }
});

module.exports = AnnotationSchema;