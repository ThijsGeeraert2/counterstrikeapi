const Joi = require('joi');
const mongoose = require('mongoose');

const gloveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    skin: {
        type: String,
        required: true
    },
    float: {
        type: Number,
        required: true
    },
    stat_trak: {
        type: Boolean,
        required: true
    },
    exterior: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const gloveModel = mongoose.model('gloves', gloveSchema);


const validateGlove = (glove) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        rarity: Joi.string().required(),
        skin: Joi.string().required(),
        float: Joi.number().required(),
        stat_trak: Joi.boolean().required(),
        exterior: Joi.string().required(),
        price: Joi.number().required()
    });
    return schema.validate(glove);
};

exports.validateGlove = validateGlove
exports.gloveModel = gloveModel