const Joi = require('joi');

const eraseContactValidation = Joi.object({
    record: Joi.object().keys({
        name: Joi.string().required(),
        relation: Joi.string().required(),
        phone: Joi.string().required()
    }).required(),
    id: Joi.number().required()
});

const eraseAcademicValidation = Joi.object({
    record: Joi.object().keys({
        grade: Joi.string().required(),
        place: Joi.string().required(),
        age: Joi.string().required()
    }).required(),
    id: Joi.number().required()
});

const eraseFile =  Joi.object({
    uid: Joi.number().required(),
    id: Joi.number().required()
});


module.exports = {
    eraseContactValidation,
    eraseAcademicValidation,
    eraseFile
}
