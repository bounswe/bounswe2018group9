const mongoose = require('mongoose');
const MediaSchema = require('./Media');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    text: true,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  
  password: {
    type: String,
    required: true,
  },
  
  images: {
    type: {
      avatar: {
        type: MediaSchema,
        required: false
      },
      cover: {
        type: MediaSchema,
        required: false
      }
    }
  },
  
  details: {
    type: {
      
      birth: {
        type: Date,
        required: false,
      },
      
      nationality: {
        type: String,
        required: false,
      },
      
      city: {
        type: String,
        required: false,
      },
      
      bio: {
        type: String,
        required: false,
      }
    },
    default: {}
  },
  
  followers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  
  following: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  
  interests: {
    type: [String],
    default: [],
  },
  
  willAttendEvents: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    default: []
  },
  
  mayAttendEvents: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    default: []
  },
  
  willNotAttendEvents: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    default: []
  }
}, { minimize: false });

// hashes password if password is modified
function hashPassword(next) {
  const user = this;

  // hash the password if it has been modified (or is new)
  if (!user.isModified('password')) next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
    if (saltError) return next(saltError);

    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);

      // override the password with the hashed one
      user.password = hash;
      return next();
    });
  });
}

// compares password with hashed password to check whether they match
function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(undefined, isMatch);
  });
}

// register hash password pre-hook
UserSchema.pre('save', hashPassword);

// register compare password method
UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('User', UserSchema);
module.exports = User;
