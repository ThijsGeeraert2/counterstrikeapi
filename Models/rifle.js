const Joi = require('joi');
const mongoose = require('mongoose');

const rifleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  rarity: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  skin: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  float: {
    type: Number,
    required: true,
    min: 0.0,
    max: 1.0
  },
  stat_trak: {
    type: Boolean,
    required: true
  },
  exterior: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const rifleModel = mongoose.model('rifles', rifleSchema);

const validateRifle = (rifle) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        type: Joi.string().min(3).max(50).required(),
        rarity: Joi.string().min(3).max(50).required(),
        skin: Joi.string().min(3).max(50).required(),
        float: Joi.number().min(0.0).max(1.0).required(),
        stat_trak: Joi.boolean().required(),
        exterior: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(rifle);
};

exports.validateRifle = validateRifle
exports.rifleModel = rifleModel
