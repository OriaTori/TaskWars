const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    trim: true,
  },
  character_id: {
    type: ObjectId,
    ref: 'Character',
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWTPRIVATEKEY);
  return token;
};

//const User = mongoose.model('User', userSchema);
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(8)
      .max(26)
      .required()
      .email()
      .trim(),
    password: Joi.string()
      .min(8)
      .max(26)
      .required()
      .trim(),
    character_id: Joi.objectId(),
    isAdmin: Joi.boolean()
  });

  return Joi.validate(user, schema);
}

// exports.User = User;
exports.user = userSchema;
exports.validateUser = validateUser;
