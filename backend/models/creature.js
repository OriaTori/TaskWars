const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  level: {
    type: Number,
    default: 1,
  },
  health: {
    type: Number,
    default: 0,
  },

  physical_power: {
    type: Number,
    default: 0,
  },
  physical_resistance: {
    type: Number,
    default: 0,
  },
  magical_power: {
    type: Number,
    default: 0,
  },
  magical_resistance: {
    type: Number,
    default: 0,
  },
  exp: {
    type: Number,
    default: 0,
  },
  gold: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  creature_task:{
    type: ObjectId,
    default: null
  },
  task_to_dmg: [
    {
    type: ObjectId,
    ref: 'Task',
    default: [],
    }
  ],
  picture: {
    type: String,
    default: ''
  }
});

function validateCreature(creature) {
  const schema = Joi.object({
    _id: Joi.number().min(0),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    level: Joi.number().min(0),
    health: Joi.number().min(0),
    physical_power: Joi.number().min(0),
    physical_resistance: Joi.number().min(0),
    physical_power: Joi.number().min(0),
    magical_power: Joi.number().min(0),
    magical_resistance: Joi.number().min(0),
    exp: Joi.number().min(0),
    gold: Joi.number().min(0),
    duration: Joi.number().min(0),
    creature_task: Joi.objectId(),
    task_to_dmg: Joi.array(),
    picture: Joi.string()
  });

  return schema.validate(creature);
}

// const Creature = mongoose.model('Creature', creatureSchema);

// exports.Creature = Creature;
exports.creature = creatureSchema;
exports.validateCreature = validateCreature;
