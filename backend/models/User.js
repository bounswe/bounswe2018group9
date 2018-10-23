var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    firstName: {
        type: String,
        required: true    
    },
    lastName: {
        type: String,
        required: true    
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User',UserSchema);

module.exports = User;