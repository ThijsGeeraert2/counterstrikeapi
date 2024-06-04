const Joi = require('joi');
const mongoose = require('mongoose');

const KnifeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  type: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  rarity: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  float: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  stat_trak: {
    type: Boolean,
    required: true,
  },
  exterior: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  }
}, { collection: 'Knives' });

const knifeModel = mongoose.model('Knife', KnifeSchema);

const validateKnife = (knives) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    type: Joi.string().min(1).max(100).required(),
    rarity: Joi.string().min(1).max(100).required(),
    float: Joi.number().min(1).max(100).required(),
    stat_trak: Joi.boolean().required(),
    exterior: Joi.string().min(1).max(100).required(),
    price: Joi.number().min(1).max(100).required()
  });
  return schema.validate(knives)
}

exports.validateKnife = validateKnife
exports.knifeModel = knifeModel;
