const Joi = require('joi');

const queryById = Joi.object({
    id: Joi.number().required()
});

const queryByPageNumber = Joi.object({
    page: Joi.number().required()
});

const queryIdentity = Joi.object({
    identity: Joi.string().required(),
    email: Joi.string().required()
});

module.exports = {
    queryByPageNumber,
    queryIdentity,
    queryById,
}